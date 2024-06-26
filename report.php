<?php
require 'functions.php';
$sql = "SELECT * FROM category_table";
$p=query($sql);
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Category Information</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>
  <body>
    <br><h1>Category Information</h1>
                <div class ="col">
                    <div>
                        <a class="btn btn-primary" href="../midkea/adminpagemidkea.html" role="button">Home</a>
                    </div>
                </div>

    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Category ID</th>
      <th scope="col">Category</th>
      <th scope="col">Manufacture</th>

    </tr>
  </thead>
  
  
<tbody>
    <?php
    //1. Create loop to read repetitive records in array
    $i=1;
    foreach($p as $pr):;
    //2. Then insert variable $pr in table rows & columns to display records
    ?>
        <tr>
            <td><?php echo $pr['category_id']; ?></td>
            <td><?php echo $pr['category']; ?></td>
            <td><?php echo $pr['manufacture']; ?></td>

    </tr>
    <?php endforeach;?>
</tbody>

</table>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </body>
</html>

<style>
        body {
            background-image: url('../midkea1/images/midkea3.jpeg'); /* Specify the path to your background image */
        }

        h1{
            font-family: 'Arial', sans-serif; /* Change the font family as needed */
            text-align: center;
            /*color: #007bff;  Change the font color as needed */
        }

        .col{
            font-family: 'Arial', sans-serif; /* Change the font family as needed */
            margin-left: 1450px;
        }

</style>