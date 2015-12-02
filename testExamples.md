X wins with horizontal move
Given [ Placed(0,0,X), Placed(1,0,X) ]
When  [ Place(2,0,X) ]
Then  [ X Won ]

O wins with vertical move
Given [ Placed(2,1,O), Placed(2,0,O) ]
When  [ Place(2,2,O) ]
Then  [ O Won ]

X wins with diagonal move
Given [ Placed(0,0,X), Placed(2,2,X) ]
When  [ Place(1,1,X) ]
Then  [ X Won ]

X marks already filled spot
Given [ Placed(0,0,O) ]
When  [ Place(0,0,X) ]
Then  [ Placed(0,0,O) ]

O tries to make a move when it's X's turn
Given [ X's turn, Placed(0,0,Empty) ]
When  [ Place(0,0,O) ]
Then  [ Placed(0,0,Empty ]

X draws with move
Given [ Placed(0,0,O), Placed(1,0,X), Placed(2,0,O),
	Placed(0,1,X), Placed(1,1,O), Placed(2,1,X),
	Placed(0,2,X), Placed(1,2,O) ]
When [ Placed(2,2,X) ]
Then [ Draw ]
