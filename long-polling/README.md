# Long Polling

Got from a nice [tutorial](http://book.mixu.net/node/ch3.html) help me understand ajax long polling.

Other notable:

- request-response (simple polling)
- sockets

Try running the code in Node and sending messages using your browser:

- By navigating to http://localhost:8080/, you can open the client
- To send messages, simply open http://localhost:8080/msg/Your+message+here

If you open several client windows, they will all receive the messages you
send.

One thing note:

> If I understand correctly, the client-side polling code is endlessly
> recursive. Isn't that a memory leak? And if so - is it fixable?

> Answering my own question after a little research: yes, it looks like the
> browsers can't optimize-out tail recursion; they die after around 20k to 30k
> recursions. Which may take a really long time, but I still think it matters
> (having spent many years in a former life coding for embedded systems).
>
> But it looks like it can be quickly fixed by replacing the 'poll();' line
> within the getJSON callback with 'setTimeout(poll, 0);'.
> - Mike Dean