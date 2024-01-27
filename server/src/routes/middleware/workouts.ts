import { NextFunction, Request, Response } from 'express';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export const validateWorkoutId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const schema = Joi.number().min(0).max(2147483647).required(); // Int-Max
  //
  // const validation: ValidationResult<any> = schema.validate(req.params.id);
  //
  // if (validation.error) {
  //   throw new Api400Error(validation.error.message);
  // }

  next();
};

export const validateNewWorkout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const schema = Joi.object({
  //   workout: Joi.object({
  //     name: Joi.string().max(30).required(),
  //     description: Joi.string().max(250).required(),
  //     exercises: Joi.array()
  //       .items(
  //         Joi.object({
  //           exerciseId: Joi.number().min(0).max(2147483647).required(),
  //           targetSetCount: Joi.number().min(1).max(30).required(),
  //           targetRepCount: Joi.number().min(1).max(2147483647).required()
  //         })
  //       )
  //       .min(1)
  //       .required()
  //   })
  // }).required();
  //
  // const validation: ValidationResult<any> = schema.validate(req.body);
  //
  // if (validation.error) {
  //   throw new Api400Error(validation.error.message);
  // }

  next();
};
