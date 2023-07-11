import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";

export default class FormDataController {
  public async store({ request }: HttpContextContract) {
    const inputData = request.only([
      "name",
      "rollNumber",
      "email",
      "gender",
      "marks",
      "phoneNumber",
    ]);

    const student = await Student.create(inputData);

    return student;
  }

  public async index() {
    const students = await Student.all();
    return students;
  }

  public async update({ request, params, response }: HttpContextContract) {
    const student = await Student.findOrFail(params.id);
    const inputData = request.only([
      "name",
      "rollNumber",
      "email",
      "gender",
      "marks",
      "phoneNumber",
    ]);
    student.merge(inputData);
    await student.save();
    return response.json(student);
  }

  public async destroy({ params }: HttpContextContract) {
    const student = await Student.findOrFail(params.id);
    await student.delete();
    return { message: "Student deleted successfully" };
  }
}
