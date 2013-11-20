<?php
	// get the query parameter from URL
	$post_id = $_POST['post_id'];
	$username = $_POST['username'];
	$action = $_POST['action'];	// Either "up" or "down"

	echo validate_login($post_id, $username, $action);

	function updateScores($post_id, $username, $action) {
		// get user_id
		$user_id_query = "select id from user where username = ".$username;
		$user_id = $db->query($user_id_query);

		// get post values
		$get_post_query = "select upvotes, downvotes from post where id = ".$post_id;
		$post_info = $db->query($get_post_query)->fetch_assoc();

		// update values
		$upvotes = $post_info['upvotes'];
		$downvotes = $post_info['downvotes'];

		if ($action == "up") {
			$upvotes += 1;

			// Add post to user's todo list
			$update_todo_list_query = "insert into todo_list values (".$post_id.", ".$user_id.", false, NULL)";
			$db->query($update_todo_list_query);
		}
		if ($action == "down") {
			$downvotes += 1;
		}

		$score = (3*$upvotes)-($downvotes);
		$total_votes = $upvotes + $downvotes;

		// update post in database
		$update_post_query = "update post set upvotes=".$upvotes.", downvotes=".$downvotes.", score=".$score.", total_votes=".$total_votes." where id = ".$post_id;
		$db->query($reset_quality_count_query);

		// update users seen posts 
		$new_seen_post_query = "insert into user_voted_posts values (".$post_id.", ".$user_id.")";
		$db->query($new_seen_post_query);

		// update user score
		$get_user_posts_query = "select score from post where user_id = ".$user_id;
		$user_posts = $db->query($get_user_posts_query);
		$num_rows = $user_posts->num_rows;

		$new_score = 0;

		for (i = 0; i < $num_rows; i++) {
			$post = $user_posts->fetch_assoc();
			$new_score += $post['score'];
		}

		$update_user_score_query = "update user set score=".$new_score." where user_id = ".$user_id;
		$db->query($update_user_score_query);
	}
?>