# IPFS Music Browser

Better name forthcoming.  Browser for music files and metadata stored in IPFS.

## quickstart

first, copy and paste the contents of `schema.sql`, then

```
npm i
sqlite3
>.open library.db
> [paste contents of schema.sql ]
```

Now ctrl-c to get out of there, and try adding some music:

```sh 
$ ./scripts/cmd.js --db=library.db ~/Music/Aim\ -\ Cold\ Water\ Music\ -\ 1999\ \(CD\ MP3\ V0\) 
added
Aim - Cold Water Music
QmY25g78HxBTGsdoimf6JHrHWzPKUybz9LwGhYYxqJoQUn 
```

Finally,

```
node index.js
```

And go to http://localhost:3000.

Feel free to add more music + refresh. It should show up there!

## license

BSD
