USE team10;


/* --- CODE TO RESET THE TABLES --- */
SET FOREIGN_KEY_CHECKS = 0;
drop table user, post, todo_list, user_voted_posts;
SET FOREIGN_KEY_CHECKS =1;


CREATE TABLE user(
	id int unsigned not null auto_increment primary key,
	username varchar(255) not null, 
	password varchar(255) not null,
	email varchar(255) not null,
	score int not null,
	currency int not null,
	quality_count int not null,
	new_count int not null,
	unique (username)
);

CREATE TABLE post(
	id int unsigned not null auto_increment primary key,
	content varchar(255) not null,
	user_id int unsigned not null,
	upvotes int not null,
	downvotes int not null,
	score int not null,
	total_votes int not null,
	category varchar(255) not null check (category = "day" || category = "year" || category = "life"),
	foreign key (user_id) references user(id)
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

/* Initial Inserts */
insert into user values (NULL, "rlangewi", md5("password"), "email@email.com", 0, 5, 5, 3);
insert into user values (NULL, "kkincade", md5("password"), "email2@email.com", 0, 5, 5, 3);
insert into user values (NULL, "tsallee", md5("password"), "email3@email.com", 0, 5, 5, 3);

insert into post values (NULL, "Get your photo taken in five interesting places", 1, 0, 1, (0*3)-(1*1), (0+1), "year");
insert into post values (NULL, "Learn a new language", 1, 1, 1, (1*3)-(1*1), (1+1), "year");
insert into post values (NULL, "Make a new friend every month", 1, 2, 1, (2*3)-(1*1), (2+1), "year");
insert into post values (NULL, "Learn a musical instrument", 1, 3, 1, (3*3)-(1*1), (3+1), "year");
insert into post values (NULL, "Try a new food each month", 2, 4, 1, (4*3)-(1*1), (4+1), "year");
insert into post values (NULL, "Set a consistent bedtime", 2, 5, 1, (5*3)-(1*1), (5+1), "year");
insert into post values (NULL, "Run a marathon", 2, 6, 1, (6*3)-(1*1), (6+1), "year");
insert into post values (NULL, "Climb a 14er", 3, 7, 1, (7*3)-(1*1), (7+1), "year");
insert into post values (NULL, "Take the stairs instead of the elevator for extra exercise", 3, 8, 1, (8*3)-(1*1), (8+1), "year");
insert into post values (NULL, "Be more punctual - be early to meetings that you attend", 3, 9, 1, (9*3)-(1*1), (9+1), "year");

insert into post values (NULL, "Read one new book each month", 1, 0, 2, (0*3)-(2*1), (0+2), "year");
insert into post values (NULL, "Make more eye contact during conversations", 1, 1, 2, (1*3)-(2*1), (1+2), "year");
insert into post values (NULL, "Start flossing your teeth", 1, 2, 2, (2*3)-(2*1), (2+2), "year");
insert into post values (NULL, "Know which candidate you’re going to vote for in the upcoming presidential election, and know why", 1, 3, 2, (3*3)-(2*1), (3+2), "year");
insert into post values (NULL, "Spend less than or equal to the money you earn each month", 2, 4, 2, (4*3)-(2*1), (4+2), "year");
insert into post values (NULL, "Break a record", 2, 5, 2, (5*3)-(2*1), (5+2), "year");
insert into post values (NULL, "Find a new TV show to get into", 2, 6, 2, (6*3)-(2*1), (6+2), "year");
insert into post values (NULL, "Run at least once a week", 3, 7, 2, (7*3)-(2*1), (7+2), "year");
insert into post values (NULL, "Get to know your neighbors", 3, 8, 2, (8*3)-(2*1), (8+2), "year");
insert into post values (NULL, "Budget to leave a super generous tip every once in a while", 3, 9, 2, (9*3)-(2*1), (9+2), "year");

insert into post values (NULL, "Keep a sketchbook", 1, 0, 2, (0*3)-(2*1), (0+2), "year");
insert into post values (NULL, "Start a blog", 1, 1, 2, (1*3)-(2*1), (1+2), "year");
insert into post values (NULL, "Take a picture a day", 1, 2, 2, (2*3)-(2*1), (2+2), "year");
insert into post values (NULL, "Start drinking tea each morning. Buy a variety of flavors", 1, 3, 2, (3*3)-(2*1), (3+2), "year");
insert into post values (NULL, "Remember people's names when you first meet them. Greet them by name the next time you see them", 2, 5, 2, (5*3)-(2*1), (5+2), "year");
insert into post values (NULL, "Take up photography", 1, 0, 2, (0*3)-(2*1), (0+2), "year");
insert into post values (NULL, "Learn to juggle", 1, 1, 2, (1*3)-(2*1), (1+2), "year");
insert into post values (NULL, "Learn calligraphy", 1, 2, 2, (2*3)-(2*1), (2+2), "year");
insert into post values (NULL, "Get a six pack", 1, 3, 2, (3*3)-(2*1), (3+2), "year");
insert into post values (NULL, "Join a band", 2, 5, 2, (5*3)-(2*1), (5+2), "year");

insert into post values (NULL, "Visit a planetarium", 1, 0, 3, (0*3)-(3*1), (0+3), "day");
insert into post values (NULL, "Take a barista coffee course", 1, 1, 3, (1*3)-(3*1), (1+3), "day");
insert into post values (NULL, "Test drive your dream car", 1, 2, 3, (2*3)-(3*1), (2+3), "day");
insert into post values (NULL, "Visit a day spa", 1, 3, 3, (3*3)-(3*1), (3+3), "day");
insert into post values (NULL, "Go see a professional theatrical production", 2, 4, 3, (4*3)-(3*1), (4+3), "day");
insert into post values (NULL, "Listen to Pandora radio until you hear a song you like. Listen to a whole album by that artist", 2, 5, 3, (5*3)-(3*1), (5+3), "day");
insert into post values (NULL, "Look up yourself of google search", 2, 6, 3, (6*3)-(3*1), (6+3), "day");
insert into post values (NULL, "Go to the zoo", 3, 7, 3, (7*3)-(3*1), (7+3), "day");
insert into post values (NULL, "Go see the city orchestra", 3, 8, 3, (8*3)-(3*1), (8+3), "day");
insert into post values (NULL, "Spend some time jumping on a trampoline", 3, 9, 3, (9*3)-(3*1), (9+3), "day");

insert into post values (NULL, "Have picnic in the park", 1, 0, 4, (0*3)-(4*1), (0+4), "day");
insert into post values (NULL, "Have a nostalgia hunt at the flea market, finding things from your childhood", 1, 1, 4, (1*3)-(4*1), (1+4), "day");
insert into post values (NULL, "Go geocaching", 1, 2, 4, (2*3)-(4*1), (2+4), "day");
insert into post values (NULL, "Have a cookie swap party. Everyone brings a type of cookie and goes home with one of each", 1, 3, 4, (3*3)-(4*1), (3+4), "day");
insert into post values (NULL, "Go to a garage sale. Spend at least $20", 2, 4, 4, (4*3)-(4*1), (4+4), "day");
insert into post values (NULL, "Have a garage sale", 2, 5, 4, (5*3)-(4*1), (5+4), "day");
insert into post values (NULL, "Have an ugly cake contest", 2, 6, 4, (6*3)-(4*1), (6+4), "day");
insert into post values (NULL, "Have a movie marathon", 3, 7, 4, (7*3)-(4*1), (7+4), "day");
insert into post values (NULL, "Google best of craigslist. Click first link and laugh", 3, 8, 4, (8*3)-(4*1), (8+4), "day");
insert into post values (NULL, "Have a board game night", 3, 9, 4, (9*3)-(4*1), (9+4), "day");

insert into post values (NULL, "Look up Brian Regan on youtube", 1, 0, 5, (0*3)-(5*1), (0+5), "day");
insert into post values (NULL, "Learn how to play golf", 1, 1, 5, (1*3)-(5*1), (1+5), "day");
insert into post values (NULL, "Join a bowling league", 1, 2, 5, (2*3)-(5*1), (2+5), "day");
insert into post values (NULL, "Learn to ski", 1, 3, 5, (3*3)-(5*1), (3+5), "day");
insert into post values (NULL, "Take horseback riding lessons", 2, 4, 5, (4*3)-(5*1), (4+5), "day");
insert into post values (NULL, "Pay for the person behind you in the drive-thru", 2, 4, 5, (4*3)-(5*1), (4+5), "day");
insert into post values (NULL, "Have a gift exchange where everyone must get their item from a garage sale", 2, 4, 5, (4*3)-(5*1), (4+5), "day");
insert into post values (NULL, "Have a murder mystery dinner", 2, 4, 5, (4*3)-(5*1), (4+5), "day");
insert into post values (NULL, "Put a walkie-talkie in a stuffed animal and mess with children", 1, 1, 5, (1*3)-(5*1), (1+5), "day");
insert into post values (NULL, "Design your own t-shirt", 1, 3, 5, (3*3)-(5*1), (3+5), "day");

insert into post values (NULL, "Visit all 50 states", 1, 0, 6, (0*3)-(6*1), (0+6), "life");
insert into post values (NULL, "Swim across the English Channel", 1, 1, 6, (1*3)-(6*1), (1+6), "life");
insert into post values (NULL, "Run a triathlon", 1, 2, 6, (2*3)-(6*1), (2+6), "life");
insert into post values (NULL, "Learn archery", 1, 3, 6, (3*3)-(6*1), (3+6), "life");
insert into post values (NULL, "Go golfing at each of the 100 Best Major Golf Courses in the World", 2, 4, 6, (4*3)-(6*1), (4+6), "life");
insert into post values (NULL, "Learn to say “hello” in 50 different languages", 2, 5, 6, (5*3)-(6*1), (5+6), "life");
insert into post values (NULL, "Learn to play the piano", 2, 6, 6, (6*3)-(6*1), (6+6), "life");
insert into post values (NULL, "Learn to play the guitar", 3, 7, 6, (7*3)-(6*1), (7+6), "life");
insert into post values (NULL, "Ride in a hot air balloon", 3, 8, 6, (8*3)-(6*1), (8+6), "life");
insert into post values (NULL, "Go skydiving", 3, 9, 6, (9*3)-(6*1), (9+6), "life");

insert into post values (NULL, "Go snorkeling in a shipwreck", 1, 0, 7, (0*3)-(7*1), (0+7), "life");
insert into post values (NULL, "Ride a mechanical bull", 1, 1, 7, (1*3)-(7*1), (1+7), "life");
insert into post values (NULL, "Go bungee jumping", 1, 2, 7, (2*3)-(7*1), (2+7), "life");
insert into post values (NULL, "Ride the world’s largest Ferris Wheels", 1, 3, 7, (3*3)-(7*1), (3+7), "life");
insert into post values (NULL, "Experience weightlessness", 2, 4, 7, (4*3)-(7*1), (4+7), "life");
insert into post values (NULL, "Visit the Grand Canyon", 2, 5, 7, (5*3)-(7*1), (5+7), "life");
insert into post values (NULL, "Visit the Great Barrier Reef", 2, 6, 7, (6*3)-(7*1), (6+7), "life");
insert into post values (NULL, "Become a poker shark", 3, 7, 7, (7*3)-(7*1), (7+7), "life");
insert into post values (NULL, "Watch all the top 100 movies on imdb.com", 3, 8, 7, (8*3)-(7*1), (8+7), "life");
insert into post values (NULL, "Watch all the top 250 movies on imdb.com", 3, 9, 7, (9*3)-(7*1), (9+7), "life");

insert into post values (NULL, "Meet the President of the United States", 1, 0, 8, (0*3)-(8*1), (0+8), "life");
insert into post values (NULL, "Audition for a reality TV show", 1, 1, 8, (1*3)-(8*1), (1+8), "life");
insert into post values (NULL, "Swim with dolphins", 1, 2, 8, (2*3)-(8*1), (2+8), "life");
insert into post values (NULL, "Get tickets to the Super Bowl", 1, 3, 8, (3*3)-(8*1), (3+8), "life");
insert into post values (NULL, "Visit all the National Parks", 2, 4, 8, (4*3)-(8*1), (4+8), "life");
insert into post values (NULL, "Step foot on every continent", 2, 5, 8, (5*3)-(8*1), (5+8), "life");
insert into post values (NULL, "Get a college degree", 2, 6, 8, (6*3)-(8*1), (6+8), "life");
insert into post values (NULL, "Ride an elephant", 3, 7, 8, (7*3)-(8*1), (7+8), "life");
insert into post values (NULL, "Choreograph a flash mob", 3, 8, 8, (8*3)-(8*1), (8+8), "life");
insert into post values (NULL, "Learn how to brew beer", 3, 9, 8, (9*3)-(8*1), (9+8), "life");


