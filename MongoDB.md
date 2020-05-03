~~~html
NoSQL Database(JS)

使用方便，想存即存，想存即存

MEAN中的M(数据)
~~~



~~~html
客户端(浏览器)

http

服务器(Node)

php node

数据库(Mongoose)

~~~



安装Moongoose及MongoDB

数据库基本操作CRUD

学习Mocha框架



## 安装环境

[官方安装文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-from-cmd)



~~~shell
# 创建data文件夹 
# 创建db文件夹 
# 进入db文件夹 
# 下载的MongoDB放到db文件夹下
# 把MongoDB的 bin -> mongod拖拽进终端 然后--dbpath 再把db文件夹拖进终端
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath "c:\data\db"

进入端口27017看是否安装成功
~~~



~~~shell
# 创建文件夹MongooseDemo 创建package.json
npm init --yes

# 安装mongoose模块
npm install mongoose --save
~~~



## 连接数据库

~~~shell
创建test文件夹
connection.js 用作连接数据库和增删改查
~~~

~~~javascript
// 引入模块
var mongoose = require("mongoose");
 
// 连接MongonDB  test是数据库名 mongodb是协议头
mongoose.connect("mongodb://localhost/test");

// 测试数据库是否连接成功  once相当于触发事件
mongoose.connection.once("open",function() {
    console.log("数据库连接成功!");
}).on("error",function(error) {
    console.log("连接失败: ",error);
});
// 可直接右键运行
~~~



## 集合与数据模型

~~~shell
创建model文件夹
mariochar.js 用作创建模型
~~~

~~~javascript
// 集合collections    数据模型model
// 往集合存数据 模型是规范

// 引入模块
const mongoose = require("mongoose");

// 获取规范类
const Schema = mongoose.Schema;

// 规范数据格式
const MarioCharSchema = new Schema({
    name: String,
    weight: Number,
});

// 创建数据模型  参数1 指定名(name) 参数2 前面规范的数据格式
const MarioChar = mongoose.model("Mario",MarioCharSchema);

// 存储
MarioChar.save().then()

// 导出
module.exports = MarioChar;
~~~



## 初识Mocha

~~~html
用于测试Mongoose的框架

测试数据库是否连接成功
测试数据增删改查

npmjs.com
搜索mocha
~~~

~~~shell
# 安装mocha 并存储进package.json
npm install mocha --save
~~~



~~~javascript
test文件夹下
demotest.js

const macha = require("mocha");
const assert = require("assert"); //自带的 引入断言模块

/**
 * 测试哪个数据库
 * @param 参数1 写测试哪个 参数2
 */
// 测试时对当前测试的一个描述
descirbe("demo test",function() {
    // 创建需要测试的任务
    // 参数1 任务名 
    it("测试两个数的值是否相等",function() {
        // 使用断言 类似于错误捕获 try catch
        assert(2 + 3 === 5);
        
        // package.json中scripts test 修改成mocha 因为echo是php的
        // 控制台输入npm run test 谁引用了mocha就会运行谁
       	// 看控制台
    })
});
~~~



## 存储数据

~~~shell
test文件下
saving_test.js
~~~



~~~javascript
const macha = require("mocha");
const assert = require("assert"); //自带的 引入断言模块

const MarioChar = require("../models/mariochar")

descirbe("存储数据",function() {
    it("saving data",function() {
        // 准备需要存储的数据
        let char = new MarioChar({
            name:"Mario"
        });
        // 存储数据
        char.save().then(function(result) {
            console.log(result.name)
            // 注意connection.js加一句Promise
            // assert(result.isNew === false);
        },function() {
            
        });
        
    })
});
~~~



~~~javascript
到connection.js中 加一句
mongoose.Promise = global.Promise;
~~~





## 初识RoboMongo

~~~html
借助这个可视化工具 
官网robomongo.org下载  dmg安装包
点击后
create -> save -> conect

可以看到test
Collections
mario 可以看到多次运行的 
	_id是个{} 要取到字符串 需要toString()

Users
~~~



## 查询数据

~~~javascript
test文件夹下
finding_test.js

const macha = require("mocha");
const assert = require("assert"); //自带的 引入断言模块

const MarioChar = require("../models/mariochar")

descirbe("查找数据",function() {
    it("finding data",function(done) {
        // 注意上面传了回调函数done
        // 参数1 空对象就全部查找
       // MarioChar.find()
        // 查询一条数据
        MarioChar.findOne({name:"Mario"}).then(function(result) {
            console.log(result);
            console.log(result._id.toString());
            done();
            // 任务监听完成后,会调用done方法 才会打印数据
        })
    });
});
~~~



## 通过id获取数据

存数据的时候就拿到id

~~~javascript
const macha = require("mocha");
const assert = require("assert"); //自带的 引入断言模块

const MarioChar = require("../models/mariochar")

descirbe("存储数据",function() {
    let char; // 注意这里定义char findOne()中才能用到
    
    it("saving data",function() {
        // 准备需要存储的数据
        char = new MarioChar({
            name:"Mario"
        });
        
        // 存储数据
        char.save().then(function(result) {
           	// console.log(result.name)
            // 注意connection.js加一句Promise
            assert(result.isNew === false);
        },function() {
            
        });
    });
    it("finding data by id", function(done) {
        MarioChar.findOne({_id: char._id}).then(result=> {
            console.log(result);
            console.log(result._id);
            done();
        })
    })
});
~~~

