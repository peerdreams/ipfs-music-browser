# IPFS Music Browser

Better name forthcoming.  Browser for music files and metadata stored in IPFS.

## quickstart

you have two options: you can fetch your existing library:

```
ipfs get [ipns address] -o library.db
```

or, you can create a new one from scratch:

```
npm i
sqlite3
>.open library.db
> [ paste contents of schema.sql ]
```

Now ctrl-c to get out of there, and try adding some music:
**NOTE**: you'll have to do a separate npm install in `lib/music-dir-to-ipfs` for now, will fix. 

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
