module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      Name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Quantity:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Description:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      Price:{
        type:DataTypes.DECIMAL,
        allowNull:false,
      },
      Shop:{
        type:DataTypes.STRING,
        allowNull:true,
      },
     
    });
    return Product;
  };
  