import { FieldError } from './FieldError';
import { User } from '.././entities/User';
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({ implements: IMutationResponse })
export class UserMutationRespone implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({nullable: true})
  user?: User;

  @Field(_type => [FieldError])// graphql dat class trong []
  errors?: FieldError[];// typescript dat [] o cuoi
}