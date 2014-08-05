#Console Catcher

is the result of trying to make things work late at night. Beam otherwise unreachable console.logs to a websocket (i.e PhoneGap).

Console Catcher sends your console.logs to a desired websocket, where you can happily tail the unreachable. console.log message will not be blocked.

To start:

1) Include the JS file

2)
```javascript
<script src="text/javascript">
  catcher = new ConsoleCatcher({url: location of websocket})
</script>
```
