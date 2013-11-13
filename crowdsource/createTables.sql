USE team10;

CREATE TABLE user(
	id int unsigned not null auto_increment primary key,
	username varchar(255) not null, 
	password varchar(255) not null,
	email varchar(255) not null,
	score int not null,
	currency int not null,
	quality_count int not null,
	new_count int not null,
	unique (username) /* This may be a problem */
);

CREATE TABLE post(
	id int unsigned not null auto_increment primary key,
	content varchar(255) not null,
	user_id int unsigned not null,
	upvotes int not null,
	downvotes int not null,
	category varchar(255) not null check (category = "day" || category = "year" || category = "life"),
	flagged boolean not null,
	foreign key (id) references user(id)
);

CREATE TABLE todo_list(
	post_id int unsigned not null,
	user_id int unsigned not null,
	completed boolean not null,
	time timestamp not null,
	foreign key (post_id) references post(id),
	foreign key (user_id) references user(id)
);

CREATE TABLE user_voted_posts(
	post_id int unsigned not null,
	user_id int unsigned not null,
	foreign key (post_id) references post(id),
	foreign key (user_id) references user(id)
);
