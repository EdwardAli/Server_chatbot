module.exports = (sequelize, DataTypes) => {
  const Shops = sequelize.define("Shops", {
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
});

  Shops.associate = (models) => {
    Shops.hasMany(models. Product, {
      onDelete: "cascade",
    });

  };

  return Shops;
};
