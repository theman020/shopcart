const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/vendors.db'
});

//defining our Model.
const vendors=db.define('vendor',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        validate:{
            notEmpty:true
          },
        allowNull:false
    }    
})

//definin our Product.
const products=db.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        validate:{
            notEmpty:true
          },
        allowNull:false
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false,
        defaultValue: 0.0
    }

})

//defining User Model
const users=db.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        validate:{
            notEmpty:true
          },
        allowNull:false
    }
})


//defining our cart
const carts=db.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    quantity:{
        type: Sequelize.INTEGER
    }
})

vendors.hasMany(products,{onDelete:'cascade'});
products.belongsTo(vendors)
users.hasMany(carts)
carts.belongsTo(users)
products.hasMany(carts,{onDelete:'cascade'});
carts.belongsTo(products)
module.exports={
    db,vendors,products,users,carts
}
