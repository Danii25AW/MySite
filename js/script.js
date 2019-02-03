'use strict';


/*
    Переменная url
    Хранит в себе адрес сервера, куда нужно отправлять запросы
 */
const url = 'http://' + window.location.host +'/php/request.php';

/*
    Переменная urllocation
    Хранит в себе полный адрес сайта
 */
const urllocation = new URL(window.location);


/*
    getRequest функция с параметром body
    Служит для асинхронной отправки запросов на сервер
    Возвращает ответ от сервера при успешном выполнении или выводит в консоль ошибку при неуспешном выполнении
 */
const getRequest = async (body) => {
    let data = await (await (fetch(url,
        {
            method: "POST",
            body: body
        })
        .then(res => {
            return res.json()
    })
        .catch(err => {
            console.log('Error: ', err)
        })
    ));
    return data;
};

/*
    getDisciplines функция без параметров
    Служит для получения списка дисциплин
 */
const getDisciplines = () => {
    getRequest('[{"getDisciplines":"all"}]').then(res => {
        $("#discipl_block").removeClass("d-none")
        $("#tasks_block").addClass("d-none")
        $("#editTasks_block").addClass("d-none")
        $("#discipl_table").html('');
        res.map( (item) =>  {
            $("#discipl_table").append('<tr>'+
            '<th >'+item.title+'</th>'+
            '<th ><button class="btn btn-primary view" data-id="'+item.id+'">Читать</button></th>'+
            '<th ><button class="btn btn-success edit" data-id="'+item.id+'">Редактировать</button></th>'+
            '<th ><button class="btn btn-danger del" data-id="'+item.id+'">Удалить</button></th>'+ 
        '</tr>');
        })
    });

};

/*
    getTasks функция с параметром id (id дисциплины)
    Служит для получения списка разделов дисциплины
 */
const getTasks = (id) => {
    getRequest('[{"getTasks":["'+id+'"]}]').then(res => {
        $("#tasks_block").removeClass("d-none")
        $("#discipl_block").addClass("d-none")
        $("#tasks_table").html('');
        res.map( (item,index) =>  {
            if(item.lab_t){
                const all_t  = (parseInt(item.lab_t) + parseInt(item.lesson_t) + parseInt(item.practice_t) + parseInt(item.work_t))
                $(".all_t").html(all_t)
                $(".lab_t").html(item.lab_t)
                 $(".lec_t").html(item.lesson_t)
                 $(".practice_t").html(item.practice_t)
                 $(".work_t").html(item.work_t)
            }
            index === 0 ? $("#discipl_name").html(item.discipl_name) : null
            if (item.title !== null && item.title !== undefined) {
            $("#tasks_table").append('<tr>'+
                '<th scope="row">'+(index+1)+'</th>'+
                '<td>'+item.title+'</td>'+
                '<td>'+item.lesson_time+'</td>'+
                '<td>'+item.lab_time+'</td>'+
                '<td>'+item.work_time+'</td>'+
                '<td>'+item.practice_time+'</td>'+
                '</tr>'       )
            }
        })
    });

};

/*
    ChangeTask функция с параметрами disc,id,title,lesson_t,lab_t,work_t,practice_t
    Служит для отправки новых данных раздела дисциплины
 */
const ChangeTask = (disc,id,title,lesson_t,lab_t,work_t,practice_t) => {
    getRequest('[{"changeTask":["'+id+'","'+title+'","'+lesson_t+'","'+lab_t+'","'+work_t+'","'+practice_t+'"]}]').then(res => {
        getTasksEdit(disc)
    });

};

/*
    changeDiscName функция с параметрами id,title
    Служит для отправки данных нового названия дисциплины
 */
const changeDiscName = (id,title) => {
    getRequest('[{"changeDiscName":["'+id+'","'+title+'"]}]').then(res => {
        
    });

};

/*
    deleteTask функция с параметрами id,disc
    Служит для удаления раздела дисциплины
 */
const deleteTask = (id,disc) => {
    getRequest('[{"deleteTask":["'+id+'"]}]').then(res => {
        getTasksEdit(disc)
    });

};

/*
    deleteDiscipl функция с параметром id (id дисциплины)
    Служит для удаления дисциплины
 */
const deleteDiscipl = (id) => {
    getRequest('[{"deleteDiscipl":["'+id+'"]}]').then(res => {
        getDisciplines()
    });

};

/*
    addDiscipl функция с параметром title 
    Служит для создания новой дисциплины
 */
const addDiscipl = (title) => {
    getRequest('[{"addDiscipl":["'+title+'"]}]').then(res => {
        getDisciplines()
    });

};

/*
    addTask функция с параметрами id,title,lesson_t,lab_t,work_t,practice_t
    Служит для создания нового раздела дисциплины
 */
const addTask = (id,title,lesson_t,lab_t,work_t,practice_t) => {
    getRequest('[{"addTask":["'+id+'","'+title+'","'+lesson_t+'","'+lab_t+'","'+work_t+'","'+practice_t+'"]}]').then(res => {
        getTasksEdit(id)
    });

};

/*
    getTasksEdit функция с параметром id (id дисциплины)
    Служит для редактирования раздела дисциплины
 */
const getTasksEdit = (id) => {
    getRequest('[{"getTasks":["'+id+'"]}]').then(res => {
        $("#editTasks_block").removeClass("d-none")
        $("#discipl_block").addClass("d-none")
        $("#tasks_table_edit").html('');
        $("#discipl_name_edit").val('') 
        res.map( (item,index) =>  {
            if (index === 0)
             {
                 $("#discipl_name_edit").val(item.discipl_name)                  
                 $("#discipl_name_edit").attr('data-id', id);
            }
            if(item.lab_t){
                const all_t  = (parseInt(item.lab_t) + parseInt(item.lesson_t) + parseInt(item.practice_t) + parseInt(item.work_t))
                $(".all_t").html(all_t)
                $(".lab_t").html(item.lab_t)
                 $(".lec_t").html(item.lesson_t)
                 $(".practice_t").html(item.practice_t)
                 $(".work_t").html(item.work_t)
            }
            if (item.title !== null && item.title !== undefined){
            $("#tasks_table_edit").append('<tr>'+
                '<th scope="row">'+(index+1)+'</th>'+
                '<td><input class="edit_title" value="'+item.title+'"></td>'+
                '<td><input class="edit_lesson_t" value="'+item.lesson_time+'"></td>'+
                '<td><input class="edit_lab_t" value="'+item.lab_time+'"></td>'+
                '<td><input class="edit_work_t" value="'+item.work_time+'"></td>'+
                '<td><input class="edit_practice_t" value="'+item.practice_time+'"></td>'+
                '<td><button class="btn btn-outline-success edit_task" data-disc="'+id+'" data-id="'+item.id+'">Изменить</button></td>'+
                '<td><button class="btn btn-outline-danger delete_task" data-disc="'+id+'" data-id="'+item.id+'">Удалить</button></td>'+
                '</tr>'       );
            }
        })
        $("#tasks_table_edit").append('<tr>'+
                '<th scope="row"></th>'+
                '<td><input class="add_title" value=""></td>'+
                '<td><input class="add_lesson_t" value=""></td>'+
                '<td><input class="add_lab_t" value=""></td>'+
                '<td><input class="add_work_t" value=""></td>'+
                '<td><input class="add_practice_t" value=""></td>'+
                '<td><button data-id="'+id+'" class="btn btn-outline-warning add_task">Добавить</button></td>'+
                '</tr>'       );
    });

};



/*
    Главная функция приложения
    Срабатывает после того, как страница была загружена пользователем
 */
$(document).ready(function () {

   
   getDisciplines();


    /*
        Функция срабатывает по клику на кнопку Читать
     */
    $(document).on('click','.view', function() {
        let discipl = $(this).data("id");
        getTasks(discipl)
    });

    /*
        Функция срабатывает по клику на кнопку Изменить у раздела дисциплины
     */
    $(document).on('click','.edit_task', function() {
        const discipl  = $(this).data("disc"); 
        const id = $(this).data("id");
        const title = $(this).parent().parent().find( ".edit_title" ).val();
        const lesson_t = $(this).parent().parent().find( ".edit_lesson_t" ).val();
        const lab_t = $(this).parent().parent().find( ".edit_lab_t" ).val();
        const work_t = $(this).parent().parent().find( ".edit_work_t" ).val();
        const practice_t = $(this).parent().parent().find( ".edit_practice_t" ).val();
        ChangeTask(discipl,id,title,lesson_t,lab_t,work_t,practice_t)
    });

    /*
        Функция срабатывает по клику на кнопку Изменить у названия дисциплины
     */
    $(document).on('click','.task_name_edit', function() {
        const id = $("#discipl_name_edit").data("id");  
        const title =  $("#discipl_name_edit").val()     
        changeDiscName(id,title)
    });

    /*
        Функция срабатывает по клику на кнопку удалить у раздела дисциплины
     */
    $(document).on('click','.delete_task', function() {
        const id = $(this).data("id");    
        const discipl  = $(this).data("disc"); 
        deleteTask(id,discipl)
    });

    /*
        Функция срабатывает по клику на кнопку удалить у дисциплины
     */
    $(document).on('click','.del', function() {
        const id = $(this).data("id");    
    
        deleteDiscipl(id)
    });

    /*
        Функция срабатывает по клику на кнопку Добавить у разделов дисциплины
     */
    $(document).on('click','.add_task', function() {
        const id = $(this).data("id");
        const title = $(this).parent().parent().find( ".add_title" ).val();
        const lesson_t = $(this).parent().parent().find( ".add_lesson_t" ).val();
        const lab_t = $(this).parent().parent().find( ".add_lab_t" ).val();
        const work_t = $(this).parent().parent().find( ".add_work_t" ).val();
        const practice_t = $(this).parent().parent().find( ".add_practice_t" ).val();
        addTask(id,title,lesson_t,lab_t,work_t,practice_t)
    });

    /*
        Функция срабатывает по клику на кнопку Редактировать у дисциплины
     */
    $(document).on('click','.edit', function() {
        let discipl = $(this).data("id");
        getTasksEdit(discipl)
    });

    /*
        Функция срабатывает по клику на кнопку Добавить у дисциплины
     */
    $(document).on('click','.add_discipl', function() {
        let discipl = $("#title_discipl_add").val();
        addDiscipl(discipl)
    });

    /*
        Функция срабатывает по клику на кнопку Дисциплины в меню сайта
     */
    $(document).on('click','#disc_link', function() {
        getDisciplines();
    });

    
});

