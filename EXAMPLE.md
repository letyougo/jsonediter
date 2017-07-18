
# 当你创建完数据表的时候你得到了一个这样的链接

```   
    //   host/项目名/数据表名
http://10.38.163.96:9091/db/projects
  
```

```
  // 数据表中有以下数据
{
  "projects": [
    {
      "id": 1,
      "title": "json-server1",
      "author": "typicode"
    },
    {
      "id": 2,
      "title": "json-server2",
      "author": "typicode"
    }]}
```

# 你可以对这个数据表中的数据做增删改查

## 例如：

## GET:

```
  // 取所有数据
  fetch('http://10.38.163.96:9091/db/projects')



  // 取 id=1 的数据
  fetch('http://10.38.163.96:9091/db/projects?id=1')

    
  或者 fetch('http://10.38.163.96:9091/db/projects/1')



  // 取 title=json-server1 的数据
  或者 fetch('http://10.38.163.96:9091/db/projects/?title=json-server1')



```
## POST

```
// 创建一条新数据
fetch('http://10.38.163.96:9091//db/projects/', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": 3,
      "title": "json-server3",
      "author": "typicode"
    }),
  })

```

## DELETE

```
// 删除第一条数据
fetch('http://10.38.163.96:9091//db/projects/1', {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
```
## PUT

```
// 更新第二条数据
fetch('http://10.38.163.96:9091//db/projects/2', {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": 2,
      "title": "json-server22222222222222",
      "author": "typicode"
    }),
  })

```
