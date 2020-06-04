import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

// TODO: Mover para arquivos separados caso necessario
export interface CommentAttributes {
  id?: number;
  title?: string;
  comment?: string;
  post?: number;
  user?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {}

export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) : CommentModel => {
  const Comment : CommentModel = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    tableName: 'comments'
  });

  Comment.associate = (models: ModelsInterface) : void => {
    
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user'
      }
    });

    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post'
      }
    });
  }

  return Comment;
}