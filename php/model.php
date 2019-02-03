<?php
class Model extends DB {


    /*
     * Функция получения списка дисциплин
     */
    public function getDisciplines() {
        $STH = $this->dbh->prepare("select * from disciplines");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }

    /*
     * Функция получения списка разделов дисциплин
     */
    public function getTasks($id) {
        
        $STH = $this->dbh->prepare("select disciplines.title as discipl_name,discipl_tasks.* from disciplines 
        left join discipl_migration on discipl_migration.id_discipl = $id
        left join discipl_tasks on discipl_tasks.id = discipl_migration.id_task
        where (disciplines.id  = $id)");
        $STH->execute();
        $results1 = $STH->fetchAll(PDO::FETCH_ASSOC);
        $STH = $this->dbh->prepare("select COALESCE(SUM(discipl_tasks.lab_time),0) as lab_t, COALESCE(SUM(discipl_tasks.lesson_time),0) as lesson_t, COALESCE(SUM(discipl_tasks.practice_time),0) as practice_t, COALESCE(SUM(discipl_tasks.work_time),0) as work_t
        from discipl_tasks 
        left join discipl_migration on discipl_migration.id_discipl = $id
        where (discipl_tasks.id = discipl_migration.id_task)");
        $STH->execute();
        $results2 = $STH->fetchAll(PDO::FETCH_ASSOC);
        $results = array_merge($results1, $results2);
        return ($results);
    }

    /*
     * Функция добавления раздела дисциплины
     */
    public function addTask($id,$title,$lesson_t,$lab_t,$work_t,$practice_t) {
        $STH = $this->dbh->prepare("insert into discipl_tasks(title,lesson_time,lab_time,work_time,practice_time) VALUES('$title','$lesson_t','$lab_t','$work_t','$practice_t')");
        $STH->execute();
        $id_task = $this->dbh->lastInsertId();
        $STH = $this->dbh->prepare("insert into discipl_migration(id_discipl,id_task) VALUES($id,$id_task)");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }


     /*
     * Функция добавления дисциплины
     */
    public function addDiscipl($title) {
        $STH = $this->dbh->prepare("insert into disciplines(title) VALUES('$title')");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }


    /*
     * Функция изменения раздела дисциплины
     */
    public function changeTask($id,$title,$lesson_t,$lab_t,$work_t,$practice_t) {
        $STH = $this->dbh->prepare("update discipl_tasks set title='$title',lesson_time='$lesson_t',lab_time='$lab_t',work_time='$work_t',practice_time='$practice_t' where id=$id");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }

    /*
     * Функция изменения дисциплины
     */
    public function changeDiscName($id,$title) {
        $STH = $this->dbh->prepare("update disciplines set title='$title' where id=$id");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }

     /*
     * Функция удаления раздела дисциплины
     */
    public function deleteTask($id) {
        $STH = $this->dbh->prepare("DELETE FROM discipl_tasks WHERE id = $id");
        $STH->execute();
        $STH = $this->dbh->prepare("DELETE FROM discipl_migration WHERE id_task = $id");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }

     /*
     * Функция удаления дисциплины
     */
    public function deleteDiscipl($id) {
        $STH = $this->dbh->prepare("DELETE FROM disciplines WHERE id = $id");
        $STH->execute();
        $STH = $this->dbh->prepare("DELETE FROM discipl_migration WHERE id_discipl = $id");
        $STH->execute();
        $results = $STH->fetchAll(PDO::FETCH_ASSOC);
        return ($results);
    }

}