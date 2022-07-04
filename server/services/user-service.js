const userModel = require("../model/userModel")


class userServices {

    async findUser(filter) {

         try {
           let lund =  await userModel.findOne(filter) //phone,username,name chahiye sayad
           return lund;
         } catch (error) {
             console.log(error);
         }
    }

    async createUser(phone) {

        await userModel.create({phone: phone})

    }


}

module.exports = new userServices()