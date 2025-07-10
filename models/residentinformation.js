'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResidentInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Resident
      ResidentInformation.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

      // Association with ResidentCategory
      ResidentInformation.belongsTo(models.ResidentCategory, {
        foreignKey: 'ResidentCategoryId',
        as: 'residentCategory'
      });

      // Association with Zone
      ResidentInformation.belongsTo(models.Zone, {
        foreignKey: 'ZoneId',
        as: 'zone'
      });

      // Association with Sex
      ResidentInformation.belongsTo(models.Sex, {
        foreignKey: 'sexId',
        as: 'sex'
      });

      // Associations with Religion
      ResidentInformation.belongsTo(models.Religion, {
        foreignKey: 'religionId',
        as: 'religion'
      });

      // Associations with CivilStatus
      ResidentInformation.belongsTo(models.CivilStatus, {
        foreignKey: 'CivilStatusId',
        as: 'civilStatus'
      });

      // Associations with BloodType
      ResidentInformation.belongsTo(models.BloodType, {
        foreignKey: 'BloodTypeId',
        as: 'bloodType'
      });

      // Associations with EducationalAttainment
      ResidentInformation.belongsTo(models.EducationalAttainment, {
        foreignKey: 'EducationalAttainmentId',
        as: 'educationalAttainment'
      });

      // Associations with Occupation
      ResidentInformation.belongsTo(models.Occupation, {
        foreignKey: 'OccupationId',
        as: 'occupation'
      });

      // Associations with Nationality
      ResidentInformation.belongsTo(models.Nationality, {
        foreignKey: 'NationalityId',
        as: 'nationality'
      });
    }
  }
  ResidentInformation.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ResidentNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 50] // Adjust length as needed
      }
    },
    ResidentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ResidentCategories',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    Birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString() // Ensure birthdate is in the past
      }
    },
    ZoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'Zones',
        key: 'Id'
      },
      omDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    sexId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sexes',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Religions', 
        key: 'Id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    CivilStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CilvilStatuses',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    BloodTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BloodTypes',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    EducationalAttainmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EducationalAttainments',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    OccupationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Occupations',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    NationalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Nationalities',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    Income: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: true,
        min: 0 // Ensure income is non-negative
      }
    },
    ContactNo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9\s\-\+]+$/i // Validate phone number format
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true // Validate email format
      }
    },
    PhilsysNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PrecintNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SSSNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    GSISNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PagibigNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Tin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PhilhealthNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IsPWD: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsIndigent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is4Ps: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSoloParent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeceased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ResidentInformation',
    tableName: 'ResidentInformations',
    timestamps: true,
  });
  return ResidentInformation;
};