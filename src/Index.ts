import express, { Router, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ResponseMessage } from "./utils/ResponseMessage";
import { dbConnection } from "./config/Db.config";
import { StatusCodes } from "http-status-codes";
import { hash, compare } from "bcrypt";
import { userModel } from "./models/User.ts";
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
} from "./controller/UserController.ts";
import userRoutes from "./routes/UserRoutes.ts";
import jwt from "jsonwebtoken";
import moment from "moment";
import nodemailer from "nodemailer";
import sentMail from "./services/EmailService.ts";
import twilio from "twilio";
import {
  deleteEmployee,
  updateEmployee,
  getAllEmployee,
  activeDeactiveEmployeeStatus,
  getSingleEmployee,
} from "./controller/EmployeeController.ts";
import employeeRoutes from "./routes/EmployeeRoutes.ts";
import { taskModel } from "./models/Task.ts";
import {
  createOrUpdateTask,
  deleteTask,
  getAllTask,
  activeDeactiveTaskStatus,
} from "./controller/TaskController.ts";
import taskRoutes from "./routes/TaskRoutes.ts";
import multer from "multer";
dotenv.config();

export {
  multer,
  activeDeactiveTaskStatus,
  deleteTask,
  getAllTask,
  taskRoutes,
  taskModel,
  createOrUpdateTask,
  getSingleEmployee,
  activeDeactiveEmployeeStatus,
  employeeRoutes,
  getAllEmployee,
  deleteEmployee,
  updateEmployee,
  changePassword,
  resetPassword,
  verifyOtp,
  twilio,
  sentMail,
  nodemailer,
  forgotPassword,
  moment,
  NextFunction,
  login,
  jwt,
  userRoutes,
  Request,
  Response,
  register,
  Router,
  hash,
  compare,
  userModel,
  express,
  cors,
  dotenv,
  mongoose,
  ResponseMessage,
  dbConnection,
  StatusCodes,
};
