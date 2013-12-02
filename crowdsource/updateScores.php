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
			$user_id_query = "select id from user where username = ?";
			$stmt = $db->prepare($user_id_query);
			$stmt->bind_param("s", $username);
			$stmt->bind_result($user_id);
			$stmt->execute();
			$stmt->fetch();
			$stmt->free_result();
		}

		// get post values
		$get_post_query = "select upvotes, downvotes from post where id = ?";
		$stmt = $db->prepare($get_post_query);
		$stmt->bind_param("i", $post_id);
		$stmt->bind_result($upvotes, $downvotes);
		$stmt->execute();
		$stmt->fetch();
		$stmt->free_result();

		if ($action == "up") {
			$upvotes += 1;

			// Add post to user's todo list
			if ($username != "guest") {
				$update_todo_list_query = "insert into todo_list values (?, ?, false, NULL)";
				$stmt = $db->prepare($update_todo_list_query);
				$stmt->bind_param("ii", $post_id, $user_id);
				if (!$stmt->execute()) {
					return "<p class = \"suggestion\">Error: Post could not be added to your to-do list. Please try again later.</p>";
				}
			}
		}
		if ($action == "down") {
			$downvotes += 1;
		}

		$score = (3*$upvotes)-($downvotes);
		$total_votes = $upvotes + $downvotes;

		// update post in database
		$update_post_query = "update post set upvotes=?, downvotes=?, score=?, total_votes=? where id=?";
		$stmt = $db->prepare($update_post_query);
		$stmt->bind_param("iiiii", $upvotes, $downvotes, $score, $total_votes, $post_id);
		$stmt->execute();

		// update users seen posts 
		if ($username != "guest") {
			$new_seen_post_query = "insert into user_voted_posts values (?, ?)";
			$stmt = $db->prepare($new_seen_post_query);
			$stmt->bind_param("ii", $post_id, $user_id);
			$stmt->execute();
		}

		// get post author
		$get_post_author_query = "select user_id from post where id = ?";
		$stmt = $db->prepare($get_post_author_query);
		$stmt->bind_param("i", $post_id);
		$stmt->bind_result($author_id);
		$stmt->execute();
		$stmt->fetch();
		$stmt->free_result();

		// update user score
		$new_score_query = "select sum(score) from post where user_id = ?";
		$stmt = $db->prepare($new_score_query);
		$stmt->bind_param("i", $author_id);
		$stmt->bind_result($new_score);
		$stmt->execute();
		$stmt->fetch();
		$stmt->free_result();

		$update_user_score_query = "update user set score = ? where id = ?";
		$stmt = $db->prepare($update_user_score_query);
		$stmt->bind_param("ii", $new_score, $author_id);
		$stmt->execute();

		if ($username != "guest") {
			return "<p class = \"suggestion\">This suggestion was added to your to-do list on your account page.</p>";
		}
	}
?>