'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const config = require(__dirname + '/../config/config.js')[process.env.NODE_ENV || 'development'];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Base Models (No Foreign Keys)
db.Role = require('./role')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.UserLog = require('./userlog')(sequelize, Sequelize.DataTypes);
db.Notification = require('./notification')(sequelize, Sequelize.DataTypes);
db.Sex = require('./sex')(sequelize, Sequelize.DataTypes);
db.CivilStatus = require('./civilstatus')(sequelize, Sequelize.DataTypes);
db.BloodType = require('./bloodtype')(sequelize, Sequelize.DataTypes);
db.Region = require('./region')(sequelize, Sequelize.DataTypes);
db.Province = require('./province')(sequelize, Sequelize.DataTypes);
db.Town = require('./town')(sequelize, Sequelize.DataTypes);
db.Barangay = require('./barangay')(sequelize, Sequelize.DataTypes);
db.Relationship = require('./relationship')(sequelize, Sequelize.DataTypes);
db.EducationalAttainment = require('./educationalattainment')(sequelize, Sequelize.DataTypes);
db.Nationality = require('./nationality')(sequelize, Sequelize.DataTypes);
db.Occupation = require('./occupation')(sequelize, Sequelize.DataTypes);
db.Religion = require('./religion')(sequelize, Sequelize.DataTypes);
db.ResidentCategory = require('./residentcategory')(sequelize, Sequelize.DataTypes);
db.Zone = require('./zone')(sequelize, Sequelize.DataTypes);
db.Resident = require('./resident')(sequelize, Sequelize.DataTypes);
db.ResidentInformation = require('./residentinformation')(sequelize, Sequelize.DataTypes);
db.ResidentPhoto = require('./residentphoto')(sequelize, Sequelize.DataTypes);
db.Position = require('./position')(sequelize, Sequelize.DataTypes);
db.OfficialSetting = require('./officialsetting')(sequelize, Sequelize.DataTypes);
db.BarangaySetting = require('./barangaysetting')(sequelize, Sequelize.DataTypes);
db.BusinessNature = require('./businessnature')(sequelize, Sequelize.DataTypes);
db.BusinessType = require('./businesstype')(sequelize, Sequelize.DataTypes);
db.Business = require('./business')(sequelize, Sequelize.DataTypes);
db.CertificationType = require('./certificationtype')(sequelize, Sequelize.DataTypes);
db.CertificationSetting = require('./certificationsetting')(sequelize, Sequelize.DataTypes);
db.Household = require('./household')(sequelize, Sequelize.DataTypes);
db.Family = require('./family')(sequelize, Sequelize.DataTypes);
db.HouseholdMember = require('./householdmember')(sequelize, Sequelize.DataTypes);
db.FamilyMember = require('./familymember')(sequelize, Sequelize.DataTypes);
db.BlotterType = require('./blottertype')(sequelize, Sequelize.DataTypes);
db.Blotter = require('./blotter')(sequelize, Sequelize.DataTypes);
db.BlotterParty = require('./blotterparty')(sequelize, Sequelize.DataTypes);
db.BlotterAction = require('./blotteraction')(sequelize, Sequelize.DataTypes);
db.BlotterHandler = require('./blotterhandler')(sequelize, Sequelize.DataTypes);
db.BlotterAttachment = require('./blotterattachment')(sequelize, Sequelize.DataTypes);
db.BlotterActionAttachment = require('./blotteractionattachment')(sequelize, Sequelize.DataTypes);

// Associate all models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;