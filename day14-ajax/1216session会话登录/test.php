<?php
	session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			h2{
				background-color: gold;
			}
		</style>
	</head>
	<body>
		<h1>
			欢迎
			<?php
				echo $_SESSION["uName"];
			?>
		</h1>
		<h2>这是首页</h2>
	</body>
</html>
