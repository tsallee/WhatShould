<?php
	// get the query parameter from URL
	$post_id = $_POST['post_id'];
	$username = $_POST['username'];	// "guest" for guest
	$action = $_POST['action'];	// Either "up" or "down"

	echo update_scores($post_id, $username, $action);

	function update_scores($post_id, $username, $action) {

		// Try to connect to the database
		@ $db = new mysqli('localhost', 'team10', 'pear', 'team10');
		if (mysqli_connect_errno()) {
			echo 'Error: database connection failed.';
			exit;
		}


		// get user_id
		if ($username != "guest") {
			$user_id_query = "select id from user where username = ".$username;
			$user_id = $db->query($user_id_query);
		}

		// get post values
		$get_post_query = "select upvotes, downvotes from post where id = ".$post_id;
		$post_info = $db->query($get_post_query)->fetch_assoc();

		// update values
		$upvotes = $post_info['upvotes'];
		$downvotes = $post_info['downvotes'];

		if ($action == "up") {
			$upvotes += 1;

			// Add post to user's todo list
			if ($username != "guest") {
				$update_todo_list_query = "insert into todo_list values (".$post_id.", ".$user_id.", false, NULL)";
				$db->query($update_todo_list_query);
			}
		}
		if ($action == "down") {
			$downvotes += 1;
		}

		$score = (3*$upvotes)-($downvotes);
		$total_votes = $upvotes + $downvotes;

		// update post in database
		$update_post_query = "update post set upvotes=".$upvotes.", downvotes=".$downvotes.", score=".$score.", total_votes=".$total_votes." where id = ".$post_id;
		$db->query($update_post_query);

		// update users seen posts 
		if ($username != "guest") {
			$new_seen_post_query = "insert into user_voted_posts values (".$post_id.", ".$user_id.")";
			$db->query($new_seen_post_query);
		}

		// get post author
		$get_post_author_query = "select user_id from post where id = ".$post_id;
		$author_id = $db->query($get_post_author_query)->fetch_assoc();

		// update user score
		$new_score_query = "select sum(score) from post where user_id = ".$author_id['user_id'];
		$new_score = $db->query($new_score_query)->fetch_assoc();

		$update_user_score_query = "update user set score=".$new_score['sum(score)']." where id = ".$author_id['user_id'];
		$db->query($update_user_score_query);
	}
?>