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
	flagged boolean not null,
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
insert into user values (NULL, "rlangewi", "password", "email@email.com", 0, 0, 5, 3);
insert into user values (NULL, "kkincade", "password", "email2@email.com", 0, 0, 5, 3);
insert into user values (NULL, "tsallee", "password", "email3@email.com", 0, 0, 5, 3);

insert into post values (NULL, "Year1", 1, 0, 1, (0*3)-(1*1), (0+1), "year", false);
insert into post values (NULL, "Year2", 1, 1, 1, (1*3)-(1*1), (1+1), "year", false);
insert into post values (NULL, "Year3", 1, 2, 1, (2*3)-(1*1), (2+1), "year", false);
insert into post values (NULL, "Year4", 1, 3, 1, (3*3)-(1*1), (3+1), "year", false);
insert into post values (NULL, "Year5", 2, 4, 1, (4*3)-(1*1), (4+1), "year", false);
insert into post values (NULL, "Year6", 2, 5, 1, (5*3)-(1*1), (5+1), "year", false);
insert into post values (NULL, "Year7", 2, 6, 1, (6*3)-(1*1), (6+1), "year", false);
insert into post values (NULL, "Year8", 3, 7, 1, (7*3)-(1*1), (7+1), "year", false);
insert into post values (NULL, "Year9", 3, 8, 1, (8*3)-(1*1), (8+1), "year", false);
insert into post values (NULL, "Year10", 3, 9, 1, (9*3)-(1*1), (9+1), "year", false);

insert into post values (NULL, "Year11", 1, 0, 2, (0*3)-(2*1), (0+2), "year", false);
insert into post values (NULL, "Year12", 1, 1, 2, (1*3)-(2*1), (1+2), "year", false);
insert into post values (NULL, "Year13", 1, 2, 2, (2*3)-(2*1), (2+2), "year", false);
insert into post values (NULL, "Year14", 1, 3, 2, (3*3)-(2*1), (3+2), "year", false);
insert into post values (NULL, "Year15", 2, 4, 2, (4*3)-(2*1), (4+2), "year", false);
insert into post values (NULL, "Year16", 2, 5, 2, (5*3)-(2*1), (5+2), "year", false);
insert into post values (NULL, "Year17", 2, 6, 2, (6*3)-(2*1), (6+2), "year", false);
insert into post values (NULL, "Year18", 3, 7, 2, (7*3)-(2*1), (7+2), "year", false);
insert into post values (NULL, "Year19", 3, 8, 2, (8*3)-(2*1), (8+2), "year", false);
insert into post values (NULL, "Year20", 3, 9, 2, (9*3)-(2*1), (9+2), "year", false);

insert into post values (NULL, "Year21", 1, 0, 3, (0*3)-(3*1), (0+3), "year", false);
insert into post values (NULL, "Year22", 1, 1, 3, (1*3)-(3*1), (1+3), "year", false);
insert into post values (NULL, "Year23", 1, 2, 3, (2*3)-(3*1), (2+3), "year", false);
insert into post values (NULL, "Year24", 1, 3, 3, (3*3)-(3*1), (3+3), "year", false);
insert into post values (NULL, "Year25", 2, 4, 3, (4*3)-(3*1), (4+3), "year", false);
insert into post values (NULL, "Year26", 2, 5, 3, (5*3)-(3*1), (5+3), "year", false);
insert into post values (NULL, "Year27", 2, 6, 3, (6*3)-(3*1), (6+3), "year", false);
insert into post values (NULL, "Year28", 3, 7, 3, (7*3)-(3*1), (7+3), "year", false);
insert into post values (NULL, "Year29", 3, 8, 3, (8*3)-(3*1), (8+3), "year", false);
insert into post values (NULL, "Year30", 3, 9, 3, (9*3)-(3*1), (9+3), "year", false);

insert into post values (NULL, "Year31", 1, 0, 4, (0*3)-(4*1), (0+4), "year", false);
insert into post values (NULL, "Year32", 1, 1, 4, (1*3)-(4*1), (1+4), "year", false);
insert into post values (NULL, "Year33", 1, 2, 4, (2*3)-(4*1), (2+4), "year", false);
insert into post values (NULL, "Year34", 1, 3, 4, (3*3)-(4*1), (3+4), "year", false);
insert into post values (NULL, "Year35", 2, 4, 4, (4*3)-(4*1), (4+4), "year", false);
insert into post values (NULL, "Year36", 2, 5, 4, (5*3)-(4*1), (5+4), "year", false);
insert into post values (NULL, "Year37", 2, 6, 4, (6*3)-(4*1), (6+4), "year", false);
insert into post values (NULL, "Year38", 3, 7, 4, (7*3)-(4*1), (7+4), "year", false);
insert into post values (NULL, "Year39", 3, 8, 4, (8*3)-(4*1), (8+4), "year", false);
insert into post values (NULL, "Year40", 3, 9, 4, (9*3)-(4*1), (9+4), "year", false);

insert into post values (NULL, "Year41", 1, 0, 5, (0*3)-(5*1), (0+5), "year", false);
insert into post values (NULL, "Year42", 1, 1, 5, (1*3)-(5*1), (1+5), "year", false);
insert into post values (NULL, "Year43", 1, 2, 5, (2*3)-(5*1), (2+5), "year", false);
insert into post values (NULL, "Year44", 1, 3, 5, (3*3)-(5*1), (3+5), "year", false);
insert into post values (NULL, "Year45", 2, 4, 5, (4*3)-(5*1), (4+5), "year", false);
insert into post values (NULL, "Year46", 2, 5, 5, (5*3)-(5*1), (5+5), "year", false);
insert into post values (NULL, "Year47", 2, 6, 5, (6*3)-(5*1), (6+5), "year", false);
insert into post values (NULL, "Year48", 3, 7, 5, (7*3)-(5*1), (7+5), "year", false);
insert into post values (NULL, "Year49", 3, 8, 5, (8*3)-(5*1), (8+5), "year", false);
insert into post values (NULL, "Year50", 3, 9, 5, (9*3)-(5*1), (9+5), "year", false);

insert into post values (NULL, "Year51", 1, 0, 6, (0*3)-(6*1), (0+6), "year", false);
insert into post values (NULL, "Year52", 1, 1, 6, (1*3)-(6*1), (1+6), "year", false);
insert into post values (NULL, "Year53", 1, 2, 6, (2*3)-(6*1), (2+6), "year", false);
insert into post values (NULL, "Year54", 1, 3, 6, (3*3)-(6*1), (3+6), "year", false);
insert into post values (NULL, "Year55", 2, 4, 6, (4*3)-(6*1), (4+6), "year", false);
insert into post values (NULL, "Year56", 2, 5, 6, (5*3)-(6*1), (5+6), "year", false);
insert into post values (NULL, "Year57", 2, 6, 6, (6*3)-(6*1), (6+6), "year", false);
insert into post values (NULL, "Year58", 3, 7, 6, (7*3)-(6*1), (7+6), "year", false);
insert into post values (NULL, "Year59", 3, 8, 6, (8*3)-(6*1), (8+6), "year", false);
insert into post values (NULL, "Year60", 3, 9, 6, (9*3)-(6*1), (9+6), "year", false);

insert into post values (NULL, "Year61", 1, 0, 7, (0*3)-(7*1), (0+7), "year", false);
insert into post values (NULL, "Year62", 1, 1, 7, (1*3)-(7*1), (1+7), "year", false);
insert into post values (NULL, "Year63", 1, 2, 7, (2*3)-(7*1), (2+7), "year", false);
insert into post values (NULL, "Year64", 1, 3, 7, (3*3)-(7*1), (3+7), "year", false);
insert into post values (NULL, "Year65", 2, 4, 7, (4*3)-(7*1), (4+7), "year", false);
insert into post values (NULL, "Year66", 2, 5, 7, (5*3)-(7*1), (5+7), "year", false);
insert into post values (NULL, "Year67", 2, 6, 7, (6*3)-(7*1), (6+7), "year", false);
insert into post values (NULL, "Year68", 3, 7, 7, (7*3)-(7*1), (7+7), "year", false);
insert into post values (NULL, "Year69", 3, 8, 7, (8*3)-(7*1), (8+7), "year", false);
insert into post values (NULL, "Year70", 3, 9, 7, (9*3)-(7*1), (9+7), "year", false);

insert into post values (NULL, "Year71", 1, 0, 8, (0*3)-(8*1), (0+8), "year", false);
insert into post values (NULL, "Year72", 1, 1, 8, (1*3)-(8*1), (1+8), "year", false);
insert into post values (NULL, "Year73", 1, 2, 8, (2*3)-(8*1), (2+8), "year", false);
insert into post values (NULL, "Year74", 1, 3, 8, (3*3)-(8*1), (3+8), "year", false);
insert into post values (NULL, "Year75", 2, 4, 8, (4*3)-(8*1), (4+8), "year", false);
insert into post values (NULL, "Year76", 2, 5, 8, (5*3)-(8*1), (5+8), "year", false);
insert into post values (NULL, "Year77", 2, 6, 8, (6*3)-(8*1), (6+8), "year", false);
insert into post values (NULL, "Year78", 3, 7, 8, (7*3)-(8*1), (7+8), "year", false);
insert into post values (NULL, "Year79", 3, 8, 8, (8*3)-(8*1), (8+8), "year", false);
insert into post values (NULL, "Year80", 3, 9, 8, (9*3)-(8*1), (9+8), "year", false);

insert into post values (NULL, "Year81", 1, 0, 9, (0*3)-(9*1), (0+9), "year", false);
insert into post values (NULL, "Year82", 1, 1, 9, (1*3)-(9*1), (1+9), "year", false);
insert into post values (NULL, "Year83", 1, 2, 9, (2*3)-(9*1), (2+9), "year", false);
insert into post values (NULL, "Year84", 1, 3, 9, (3*3)-(9*1), (3+9), "year", false);
insert into post values (NULL, "Year85", 2, 4, 9, (4*3)-(9*1), (4+9), "year", false);
insert into post values (NULL, "Year86", 2, 5, 9, (5*3)-(9*1), (5+9), "year", false);
insert into post values (NULL, "Year87", 2, 6, 9, (6*3)-(9*1), (6+9), "year", false);
insert into post values (NULL, "Year88", 3, 7, 9, (7*3)-(9*1), (7+9), "year", false);
insert into post values (NULL, "Year89", 3, 8, 9, (8*3)-(9*1), (8+9), "year", false);
insert into post values (NULL, "Year90", 3, 9, 9, (9*3)-(9*1), (9+9), "year", false);

insert into post values (NULL, "Year91", 1, 0, 0, (0*3)-(0*1), (0+0), "year", false);
insert into post values (NULL, "Year92", 1, 1, 0, (1*3)-(0*1), (1+0), "year", false);
insert into post values (NULL, "Year93", 1, 2, 0, (2*3)-(0*1), (2+0), "year", false);
insert into post values (NULL, "Year94", 1, 3, 0, (3*3)-(0*1), (3+0), "year", false);
insert into post values (NULL, "Year95", 2, 4, 0, (4*3)-(0*1), (4+0), "year", false);
insert into post values (NULL, "Year96", 2, 5, 0, (5*3)-(0*1), (5+0), "year", false);
insert into post values (NULL, "Year97", 2, 6, 0, (6*3)-(0*1), (6+0), "year", false);
insert into post values (NULL, "Year98", 3, 7, 0, (7*3)-(0*1), (7+0), "year", false);
insert into post values (NULL, "Year99", 3, 8, 0, (8*3)-(0*1), (8+0), "year", false);
insert into post values (NULL, "Year100", 3, 9, 0, (9*3)-(0*1), (9+0), "year", false);

insert into post values (NULL, "Year101", 1, 0, 10, (0*3)-(10*1), (0+10), "year", false);
insert into post values (NULL, "Year102", 1, 1, 10, (1*3)-(10*1), (1+10), "year", false);
insert into post values (NULL, "Year103", 1, 2, 10, (2*3)-(10*1), (2+10), "year", false);
insert into post values (NULL, "Year104", 1, 3, 10, (3*3)-(10*1), (3+10), "year", false);
insert into post values (NULL, "Year105", 2, 4, 10, (4*3)-(10*1), (4+10), "year", false);
insert into post values (NULL, "Year106", 2, 5, 10, (5*3)-(10*1), (5+10), "year", false);
insert into post values (NULL, "Year107", 2, 6, 10, (6*3)-(10*1), (6+10), "year", false);
insert into post values (NULL, "Year108", 3, 7, 10, (7*3)-(10*1), (7+10), "year", false);
insert into post values (NULL, "Year109", 3, 8, 10, (8*3)-(10*1), (8+10), "year", false);
insert into post values (NULL, "Year110", 3, 9, 10, (9*3)-(10*1), (9+10), "year", false);

/* rlangewi's posts */
insert into user_voted_posts values (1,1);
insert into user_voted_posts values (2,1);
insert into user_voted_posts values (3,1);
insert into user_voted_posts values (4,1);
insert into user_voted_posts values (11,1);
insert into user_voted_posts values (12,1);
insert into user_voted_posts values (13,1);
insert into user_voted_posts values (14,1);
insert into user_voted_posts values (21,1);
insert into user_voted_posts values (22,1);
insert into user_voted_posts values (23,1);
insert into user_voted_posts values (24,1);
insert into user_voted_posts values (31,1);
insert into user_voted_posts values (32,1);
insert into user_voted_posts values (33,1);
insert into user_voted_posts values (34,1);
insert into user_voted_posts values (41,1);
insert into user_voted_posts values (42,1);
insert into user_voted_posts values (43,1);
insert into user_voted_posts values (44,1);
insert into user_voted_posts values (51,1);
insert into user_voted_posts values (52,1);
insert into user_voted_posts values (53,1);
insert into user_voted_posts values (54,1);
insert into user_voted_posts values (61,1);
insert into user_voted_posts values (62,1);
insert into user_voted_posts values (63,1);
insert into user_voted_posts values (64,1);
insert into user_voted_posts values (71,1);
insert into user_voted_posts values (72,1);
insert into user_voted_posts values (73,1);
insert into user_voted_posts values (74,1);
insert into user_voted_posts values (81,1);
insert into user_voted_posts values (82,1);
insert into user_voted_posts values (83,1);
insert into user_voted_posts values (84,1);
insert into user_voted_posts values (91,1);
insert into user_voted_posts values (92,1);
insert into user_voted_posts values (93,1);
insert into user_voted_posts values (94,1);
insert into user_voted_posts values (101,1);
insert into user_voted_posts values (102,1);
insert into user_voted_posts values (103,1);
insert into user_voted_posts values (104,1);

/* kkincade's posts */
insert into user_voted_posts values (5,2);
insert into user_voted_posts values (6,2);
insert into user_voted_posts values (7,2);
insert into user_voted_posts values (15,2);
insert into user_voted_posts values (16,2);
insert into user_voted_posts values (17,2);
insert into user_voted_posts values (25,2);
insert into user_voted_posts values (26,2);
insert into user_voted_posts values (27,2);
insert into user_voted_posts values (35,2);
insert into user_voted_posts values (36,2);
insert into user_voted_posts values (37,2);
insert into user_voted_posts values (45,2);
insert into user_voted_posts values (46,2);
insert into user_voted_posts values (47,2);
insert into user_voted_posts values (55,2);
insert into user_voted_posts values (56,2);
insert into user_voted_posts values (57,2);
insert into user_voted_posts values (65,2);
insert into user_voted_posts values (66,2);
insert into user_voted_posts values (67,2);
insert into user_voted_posts values (75,2);
insert into user_voted_posts values (76,2);
insert into user_voted_posts values (77,2);
insert into user_voted_posts values (85,2);
insert into user_voted_posts values (86,2);
insert into user_voted_posts values (87,2);
insert into user_voted_posts values (95,2);
insert into user_voted_posts values (96,2);
insert into user_voted_posts values (97,2);
insert into user_voted_posts values (105,2);
insert into user_voted_posts values (106,2);
insert into user_voted_posts values (107,2);

/* tsallee's posts */
insert into user_voted_posts values (8,3);
insert into user_voted_posts values (9,3);
insert into user_voted_posts values (10,3);
insert into user_voted_posts values (18,3);
insert into user_voted_posts values (19,3);
insert into user_voted_posts values (20,3);
insert into user_voted_posts values (28,3);
insert into user_voted_posts values (29,3);
insert into user_voted_posts values (30,3);
insert into user_voted_posts values (38,3);
insert into user_voted_posts values (39,3);
insert into user_voted_posts values (40,3);
insert into user_voted_posts values (48,3);
insert into user_voted_posts values (49,3);
insert into user_voted_posts values (50,3);
insert into user_voted_posts values (58,3);
insert into user_voted_posts values (59,3);
insert into user_voted_posts values (60,3);
insert into user_voted_posts values (68,3);
insert into user_voted_posts values (69,3);
insert into user_voted_posts values (70,3);
insert into user_voted_posts values (78,3);
insert into user_voted_posts values (79,3);
insert into user_voted_posts values (80,3);
insert into user_voted_posts values (88,3);
insert into user_voted_posts values (89,3);
insert into user_voted_posts values (90,3);
insert into user_voted_posts values (98,3);
insert into user_voted_posts values (99,3);
insert into user_voted_posts values (100,3);
insert into user_voted_posts values (108,3);
insert into user_voted_posts values (109,3);
insert into user_voted_posts values (110,3);




