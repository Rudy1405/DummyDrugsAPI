module.exports = (io,app) => {
    const User = require('../models/userModel')

    console.log("in chats prro")
      const path = require('path')
    
        let nicknames = {};

        
        async function chat_login(req, res){
            try {
                let userMail = req.body.nickname
                let user = await User.findOne({'email': userMail})
                if(user.role === 'Cheff'){
                    let userDealer = await User.find({'role': 'Dealer'}) // si regresa
                    let dealersArray
                    for (i in userDealer){
                        dealersArray = userDealer[i].name
                        console.log(i,':::  ',dealersArray)
                    }
                        
                    res.render('onlineList', { dealers : userDealer }); /// da undefined 
                    
                }else{
                    let userCheff = await User.find({'role': 'Cheff'})
                    let cheffArray
                    for (i in cheffArray){
                        cheffArray = userCheff[i].name
                        console.log(i,':::  ',cheffArray)
                    }
                    res.render('onlineList', { dealers : userCheff });
                }
            } catch (error) {
                console.log(error)
                res.sendFile(path.resolve('public/notFound.html'));
            }

        }
        return{
            chat_login
        }

        }///exports        