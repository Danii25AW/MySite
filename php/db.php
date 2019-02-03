<?php

class db{
    protected $host = "localhost";
    protected $dbname = "webbd";
    protected $user = "root";
    protected $pass = "";
    protected $dbh;

    function __construct() {

        try {

            $this->dbh = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->user, $this->pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        }
        catch (PDOException $e) {

            echo $e->getMessage();
        }
    }

    public function closeConnection() {

        $this->dbh = null;
    }
}