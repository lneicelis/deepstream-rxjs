# Suggestions

* (recordRef|listRef).subscribe(callback) 
  callback is expected to be called in async fashion,
  however it may by called either in ASYNC or SYNC fashion;