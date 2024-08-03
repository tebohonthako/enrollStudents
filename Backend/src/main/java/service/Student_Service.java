package service;

import model.Student;

import java.util.List;


// service layer interface that acts as a bridge between DAO and Entity classes.
public interface Student_Service {

    public boolean saveStudent(Student student);
    public List<Student> getStudent();
    public boolean deleteStudent(Student student);
    public boolean updateStudent(Student student);
}
