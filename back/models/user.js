module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('user', {

            firstname: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "Enter your first name"
            },

            lastname: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: "Enter your lastname"
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,

                unique: true,
                validate: {
                    isEmail: true
                }
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false
            },


            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true,
                    len: [10]
                },
                defaultValue: "Enter your phone number"
            },

            photo: {
                type: Sequelize.STRING
            },

            photoUrl: {
                type: Sequelize.STRING
            },

            github: {
                type: Sequelize.STRING,
                defaultValue: "Enter your github link"
            },


            street: {
                type: Sequelize.STRING,
                defaultValue: "Enter your street"
            },

            job: {
                type: Sequelize.STRING,
                defaultValue: "Enter your job status"
            },

            address: {
                type: Sequelize.STRING,
                defaultValue: "Enter your address"
            },

            gender: {
                type: Sequelize.STRING,
                defaultValue: "Enter your gender"
            },

            homeaddress: {
                type: Sequelize.STRING,
                defaultValue: "Enter your homeaddress"
            },

            birthday: {
                type: Sequelize.STRING,
                defaultValue: "Enter your birthday"
            },

            site: {
                type: Sequelize.STRING,
                defaultValue: "Enter your site"
            },


            title: {
                type: Sequelize.STRING,
                defaultValue: "Enter your title"
            },

            addr: {
                type: Sequelize.STRING,
                defaultValue: "Enter your city and state"
            },

            //Skills
            HTML: {
                type: Sequelize.BOOLEAN,
                defaultValue: false

            },

            CSS: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            JavaScript: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Nodejs: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            mySQL: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Express: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Handlebars: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Bootstrap: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Python: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Angular: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },


            Ruby: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Flask: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Java: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            Cplusplus: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }

        },

        //Associations
        {
            classMethods: {
                associate: function(models) {
                    User.belongsTo(models.cohort, {
                        foreignKey: {
                            allowNull: false
                        },
                        onDelete: "CASCADE"
                    });

                    User.belongsTo(models.bootcamp, {
                        foreignKey: {
                            allowNull: false
                        },
                        onDelete: "CASCADE"
                    });
                }
            }
        });

    return User;

};
