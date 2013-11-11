USE team10;

CREATE TABLE user(
	id int unsigned not null auto_increment primary key,
	username char(20) not null,
	password char(20) not null,
	email char(50) not null,
	score int not null,
	currency int not null,
	quality_count int not null,
	new_count int not null
);

CREATE TABLE post(
	id int unsigned not null auto_increment primary key,
	content char(140) not null,
	upvotes int not null,
	downvotes int not null,
	foreign key (user_id) references user(id),
	category char(4) not null check (category = "day" || category = "year" || category = "life"),
	flagged boolean not null
);

CREATE TABLE todo_list(
	foreign key (post_id) references post(id),
	foreign key (user_id) references user(id),
	completed boolean not null,
	time timestamp not null
);

CREATE TABLE user_voted_posts(
	foreign key (post_id) references post(id),
	foreign key (user_id) references user(id),
);

