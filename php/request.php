<?php
include_once("db.php"); //Подключаем класс для работы с бд
include_once("model.php"); //Подключаем класс с функционалом нашего приложения

$con    = new DB();
$model  = new Model();
$postData = file_get_contents('php://input'); //Получаем данные, которые отправили на сервер
$data = json_decode($postData, true); //Декодируем из json в массив



/*
 * Срабатывает при запросе получения списка дисциплин
 */
if(isset($data[0]["getDisciplines"])) {

    $drar = $model->getDisciplines();
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе получения разделов дисциплины
 */
if(isset($data[0]["getTasks"])) {
    $drar = $model->getTasks($data[0]["getTasks"][0]);
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе о добавлении раздела дисциплины
 */
if(isset($data[0]["addTask"])) {
    $drar = $model->addTask($data[0]["addTask"][0],$data[0]["addTask"][1],$data[0]["addTask"][2],$data[0]["addTask"][3],$data[0]["addTask"][4],$data[0]["addTask"][5]);
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе об изменении раздела дисциплины
 */
if(isset($data[0]["changeTask"])) {
    $drar = $model->changeTask($data[0]["changeTask"][0],$data[0]["changeTask"][1],$data[0]["changeTask"][2],$data[0]["changeTask"][3],$data[0]["changeTask"][4],$data[0]["changeTask"][5]);
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе об удалении раздела дисциплины
 */
if(isset($data[0]["deleteTask"])) {
    $drar = $model->deleteTask($data[0]["deleteTask"][0]);
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе об удалении дисциплины
 */
if(isset($data[0]["deleteDiscipl"])) {
    $drar = $model->deleteDiscipl($data[0]["deleteDiscipl"][0]);
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе об добавлении дисциплины
 */
if(isset($data[0]["addDiscipl"])) {
    $drar = $model->addDiscipl($data[0]["addDiscipl"][0]);
    exit(json_encode($drar));
}

/*
 * Срабатывает при запросе об изменении дисциплины
 */
if(isset($data[0]["changeDiscName"])) {
    $drar = $model->changeDiscName($data[0]["changeDiscName"][0],$data[0]["changeDiscName"][1]);
    exit(json_encode($drar));
}
