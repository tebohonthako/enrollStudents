package service;


import DAO.Student_DAO;
import jakarta.transaction.Transactional;
import model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Student_Service_Imp implements Student_Service {

    @Autowired
    private Student_DAO studentdao;

    @Override
    public boolean saveStudent(Student student) {
        return studentdao.saveStudent(student);
    }

    @Override
    public List<Student> getStudent() {
        return List.of();
    }

    @Override
    public List<Student> getStudents() {
        return studentdao.getStudents();
    }

    @Override
    public boolean deleteStudent(Student student) {
        return studentdao.deleteStudent(student);
    }

    @Override
    public List<Student> getStudentByID(Student student) {
        return studentdao.getStudentByID(student);
    }

    @Override
    public boolean updateStudent(Student student) {
        return studentdao.updateStudent(student);
    }

}
