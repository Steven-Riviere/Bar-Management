import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  {
  dialect: 'sqlite',
  storage: 'dbreactNode.sqlite',
});
sequelize.sync();
export default sequelize;