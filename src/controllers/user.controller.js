import Account from "../models/Account";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

export async function createAccount(req, res) {
    const body = req.body;
    if (body) {
        if (body.password && body.username) {
            try {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(body.password, salt, async (error, hash) => {
                        if (error) {
                            res.status(500).json({
                                message: "Error creating account",
                            });
                        }
                        const newUser = {
                            username: body.username,
                            password: hash,
                            admin: body.admin,
                        };
                        await Account.create(newUser)
                            .then((newUser) => {
                                return res.status(201).json({
                                    message: "User created succefully",
                                });
                            })
                            .catch((error) => {
                                return res.status(200).json({
                                    message: "Error, user already exists",
                                });
                            });
                    });
                });
            } catch (error) {
                return res.status(500).json({
                    message: "Error creating account",
                });
            }
        } else {
            return res.status(500).json({
                message:"Error creating account",
            });
        }
    } else {
        return res.status(505).json({
            message: "Error creating account",
        });
    }
}

export async function updateUsername(req, res) {
    const body = req.body;
    if (body) {
        if (body.newUsername) {
            jwt.verify(req.token, 'secretKey', async (error, data) => {
                if (error) {
                    return res.status(403).json({
                        message: "Invalid token"
                    })
                }
                else {
                    await Account.findOne({
                        where: {
                            username: user.username,
                        },
                    }).then(userModify => {
                        if (userModify) {
                            userModify.username = body.newUsername,
                                userModify.save().then(userUpdated => {
                                    const user = {
                                        username: userUpdated.username,
                                        admin: userUpdated.admin
                                    }
                                    jwt.sign(user, 'secretKey',{expiresIn:"1 days"} ,(err, token) => {
                                        return res.status(200).json({
                                            token
                                        })
                                    })
                                })
                        }
                        else {
                            return res.status(500).json({
                                message: "Error, user not exist"
                            })
                        }
                    }).catch((err => {
                        return res.status(500).json({
                            message: "Error"
                        });
                    }))
                }
            })
        }
        else {
            return res.status(500).json({
                message: "Error, user not exist"
            })
        }
    } else {
        return res.status(500).json({
            message: "Error, user not exist"
        })
    }

}

export async function updatePassword(req, res) {
    const body = req.body;
    if (body) {
        if (body.password && body.newPassword1 && body.newPassword2 && body.newPassword1 === body.newPassword2) {
            jwt.verify(req.token, process.env.keyToken, async (error, user) => {
                if (error) {
                    return res.status(403).json({
                        message: "Invalid token"
                    })
                }
                else {
                    await Account.findOne({
                        where: {
                            username: user.username,
                        }
                    }).then(userUpdate => {
                        if (userUpdate) {
                            bcrypt.compare(body.password, userUpdate.password).then(result => {
                                if (result == true && body.newPassword1 != " ") {
                                    bcrypt.genSalt(10, (err, salt) => {
                                        bcrypt.hash(body.newPassword1, salt, async (error, hash) => {
                                            if (error) {
                                                res.status(500).json({
                                                    message: "Error in new password",
                                                });
                                            } else {
                                                userUpdate.password = hash
                                                await userUpdate.save().then(userUpdated => {
                                                    return res.status(200).json({
                                                        message: "User password updated successfully",
                                                    })
                                                }).catch(error => {
                                                    return res.status(500).json({
                                                        message: "Error, password was not updated"
                                                    })
                                                })
                                            }
                                        }
                                        )
                                    })
                                } else {
                                    return res.status(500).json({
                                        message: "Error, username or password incorrect"
                                    })
                                }
                            })
                        } else {
                            res.status(500).json({
                                message: "Error, username or password incorrect"
                            })
                        }
                    })
                }
            })
        }
        else {
            return res.status(500).json({
                message: "Error, passwords do not match",
            });
        }
    } else {
        return res.status(500).json({
            message: "Error, username or password incorrect"
        });
    }
}

export async function deleteAccount(req, res) {
    jwt.verify(req.token, process.env.keyToken, async (error, user) => {
        if (error) {
            return res.status(403).json({
                message: "Invalid token",
            })
        }
        else {
            await Account.findOne({
                where: {
                    username: user.username,
                }
            }).then(userDeleted => {
                if (userDeleted) {
                    userDeleted.destroy().then(data => {
                        return res.status(200).json({
                            message: "User deleted successfully",
                        })
                    })
                }
                else {
                    return res.status(500).json({
                        message: "Error, user not deleted"
                    })
                }
            })
                .catch((err => {
                    return res.status(500).json({
                        message: "Error, user not deleted",
                    });
                }))
        }
    })
}

export async function validateAccount(req, res) {
    const body = req.body;
    if (body) {
        if (body.password && body.username) {
            await Account.findOne({
                where: {
                    username: body.username
                }
            }).then(userValidate => {
                if (userValidate) {
                    bcrypt.compare(body.password, userValidate.password).then((result) => {
                        if (result == true) {
                            const user = {
                                username: userValidate.username,
                                admin: userValidate.admin
                            }
                            jwt.sign(user,process.env.keyToken,{expiresIn:"1 days"} ,(err, token) => {
                                return res.status(200).json({
                                    token
                                })
                            })
                        }
                        else{
                            return res.status(500).json({
                                message: 'Error, user not exist',
                            });
                        }
                    })
                }
                else {
                    return res.status(401).json({
                        data: 'Error, user not exist'
                    })
                }
            }).catch(err => {
                return res.status(500).json({
                    message: 'Error, user not exist',
                    error: err
                });
            })
        } else {
            return res.status(500).json({
                message: 'Error, user not exist',
            });
        }
    } else {
        return res.status(505).json({
            message: 'Error, user not exist',
        });
    }
}

