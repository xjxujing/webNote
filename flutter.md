## 安装

`flutter `中文网`flutterchina.club`或者访问 `flutter.dev`

查看“快速开始”

获取 `Flutter SDK`，点击下载， 后者去`github`下载安装包

查看“系统要求”

可以直接用 `git bash` 命令工具

~~~shell
安装 git
1. 下载 flutter SDK
新建文件夹 development
解压下载的包到 development

2. 配置环境变量
编辑系统环境变量
打开解压后的文件夹
双击flutter_console.bat，命令行可以看到大写的 FLUTTER
/bin 进入 bin 文件夹，复制路径

在环境变量中：
用户的环境变量 -> 点击编辑 Path -> 新建 （粘贴刚复制的路径）

在用户变量那里, 点击新建
到文档中 更新环境变量 这块查看 复制对应的名称
变量名 PUB_HOSTED_URL
变量值 https://pub.flutter-io.cn

变量名 FLUTTER_STORAGE_BASE_URL
变量值 https://storage.flutter-io.cn


3. 运行
flutter doctor

4. 下载 AS
安装的时候，勾上 Android Virtual Device
配置：
打开 AS
选择 Do not import settings
有提示 Don't send
选择 Custom
要勾选 Android Virtual Device

然后等待配置
~~~



~~~shell
# 创建 flutter 项目的文件夹
flutter_app

# 进入文件夹中
flutter create first_app (要使用下划线)

# 用 AS 打开 first_app
按照提示安装插件 dart,然后 restart
然后会提示 Configure plugins, 安装 flutter, ok => accept 再 restart
~~~



~~~shell
# 在编辑器中运行模拟器
tools -> AVD Manager
Create Virtual Device
Phone  -> pixel 2   next
Oreo Download(8.1)

装好后 
选择 Portrait

~~~

~~~shell
# 再运行看看
flutter doctor

flutter doctor --android-licenses  
# 以上都是 y

# windows 系统中不支持苹果的 xcode

# vscode 里面安装插件 flutter

# 启动 AS 的模拟器

# vscode 打开 flutter 的项目
flutter doctor 检查 flutter 配置
vscode 连接模拟器
Debug -> startwithout debugging  
选择 Dart & Flutter 调试环境
~~~



## 项目结构

~~~html
.idea  AS 生成的
android 转成 android 原生的代码
build 打包后的文件，生产上线用的
ios 转成 ios 原生的代码
lib 主要的源码地方（重要）
	main.dart 入口文件
test 测试
metadata 一些信息的备注
packages SDK 存储的位置
first_app.iml 
pubspec.yaml 相当于依赖包（重要）
~~~



## Dart 语法

### main 入口文件

### 分支语句

### 循环、列表、关键字

### 函数的9个知识点

### 异常捕获

一个异常：

~~~dart
void main() {  
  // int result = 12 ~/ 0; // 报错 IntegerDivisionByZeroException
  
  int result = 12 ~/ 5; // 返回大于零的整数
  print(result);
}
~~~

`try`

`catch`

~~~dart
void main() {
  try {
    int result = 12 ~/ 0; // 返回大于零的整数
    print("result is $result");
  } catch (e) {
    print("the exception throw is $e");
  }
}
// 打印 the exception throw is IntegerDivisionByZeroException
~~~

~~~dart
void main() {
  try {
    int result = 12 ~/ 0; // 返回大于零的整数
    print("result is $result");
  } catch (e, s) {
    print("the exception throw is $e");
    print("STACK TRACE \n $s");
  }
}

// 打印 更详细的错误信息
the exception throw is IntegerDivisionByZeroException
STACK TRACE 
 #0      int.~/  (dart:core-patch/integers.dart:24:7)
#1      main 
lib\main.dart:17
#2      _startIsolate.<anonymous closure>  (dart:isolate-patch/isolate_patch.dart:307:19)
#3      _RawReceivePortImpl._handleMessage  (dart:isolate-patch/isolate_patch.dart:174:12)
~~~



`on`：当需要执行异常类型的时候用`on`

~~~dart
void main() {
  try {
    int result = 12 ~/ 0; // 返回大于零的整数
    print("result is $result");
  } on IntegerDivisionByZeroException {
    print("cannot divide by zero");
  }
}
~~~



`finally`：不管发生什么情况都执行，包括`try`，`catch`里面用了`return`（只要执行了`try`/`catch`，就一定会执行）

~~~dart
void main() {
  try {
    int result = 12 ~/ 2; // 返回大于零的整数
    print("result is $result");
  } catch (e, s) {
    print("the exception throw is $e");
    print("STACK TRACE \n $s");
  } finally {
    print("不管有没有异常都会执行");
  }
}
~~~



实现自己的异常捕获方法

~~~dart
void main() {
  try {
    depositMoney(-200);
  } catch (e) {
    print("error is $e");
    print(e.errorMessage()); // 使用自己的异常捕获方法
  }
}
 
// 定义自己的方法，继承了系统提供的 Exception 类
class DepositException implements Exception {
  String errorMessage() {
    return "金额不能小于 0 元";
  }
}

// 定义一个方法
void depositMoney(int amount) {
  if (amount < 0) {
    throw new DepositException();
  }
}

// 控制台打印
error is Instance of 'DepositException'
金额不能小于 0 元
~~~



### 类

1. 类的基础知识

~~~dart
void main() {
  // 实例化
  var student1 = Student();
  student1.id = 10;
  student1.name = "sunny";
  print("${student1.id} and ${student1.name}");
  student1.sleep();


  var student2 = Student();
  student2.id = 100;
  student2.name = "bucky";
  print("${student2.id} and ${student2.name}");
  student2.study();
}

// 定义类
class Student {
  int id;
  String name;

  void study() {
    print("${this.name} is studing");
  }

  void sleep() {
    print("${this.name} is sleeping");
  }
}

~~~

2. 构造函数

3. 构造函数参数

   实例化一个类的时候，自动执行的函数

   ~~~dart
   void main() {
     // 实例化
     var student1 = Student(10, "sunny");
     // student1.id = 10;
     // student1.name = "sunny";
     print("${student1.id} and ${student1.name}");
     student1.sleep();
   
     var student2 = Student(1001, "bucky");
     // student2.id = 100;
     // student2.name = "bucky";
     print("${student2.id} and ${student2.name}");
     student2.study();
   }
   
   // 定义类
   class Student {
     int id;
     String name;
   
     Student(int id, String name) {
       print("这个就是构造函数，只要对象被实例，就会自动执行，并且先执行");
       this.id = id;
       this.name = name;
     }
     
     // 也可以写成下面这样
     // Student(int _id, String _name) {
     //   print("这个就是构造函数，只要对象被实例，就会自动执行，并且先执行");
     //   id = _id;
     //   name = _name;
     // }
       
     // 下面这样写也可以
     // Student(this.id, this.name);
   
     void study() {
       print("${this.name} is studing");
     }
   
     void sleep() {
       print("${this.name} is sleeping");
     }
   }
   
   // 控制台打印
   这个就是构造函数，只要对象被实例，就会自动执行
   10 and sunny
   sunny is sleeping
   这个就是构造函数，只要对象被实例，就会自动执行
   1001 and bucky
   bucky is studing
   ~~~

4. 定义构造函数

   ~~~dart
   void main() {
     // 实例化
     var student1 = Student(10, "sunny");
     // student1.id = 10;
     // student1.name = "sunny";
     print("${student1.id} and ${student1.name}");
     student1.sleep();
   
     var student2 = Student(1001, "bucky");
     // student2.id = 100;
     // student2.name = "bucky";
     print("${student2.id} and ${student2.name}");
     student2.study();
   
     var student3 = Student.myCustomConstructor(30, "betty");
     print("${student3.id} and ${student3.name}");
   }
   
   // 定义类
   class Student {
     int id;
     String name;
   
     Student(this.id, this.name);
   
     // 自定义构造函数
     Student.myCustomConstructor(this.id, this.name) {
       print("hello custom constructor");
     }
   
     void study() {
       print("${this.name} is studing");
     }
   
     void sleep() {
       print("${this.name} is sleeping");
     }
   }
   
   ~~~



### 自定 setter 和 getter

~~~dart
void main() {
  var student = Student();
  student.name = "lucky"; // 调用默认的 setter 方法
  print(student.name); // 调用默认的 getter 方法

  student.setAge = 32; // 调用自己的 setter 方法
  print(student.getAge); // 调用自己的 getter 方法
}

class Student {
  String name;
  int age;

  void set setAge(int num) {
    this.age = num;
  }
  // void set setAge(int num) => this.age = num;

  int get getAge {
    return this.age;
  }
  // int get getAge => this.age; // 箭头函数默认 return
}
~~~



### 类的继承

~~~dart
void main() {
  var dog = Dog();
  dog.name = "hali";
  print(dog.name);

  dog.color = "black";
  print(dog.color);

  dog.bark();
  dog.eat(); // 子类可以调用父类的方法

  var cat = Cat();
  cat.age = 1;
  print(cat.age);

  cat.color = "white";
  print(cat.color);

  cat.meow();
  cat.eat(); // 子类可以调用父类的方法

  // 实例化父类 animal
  var animal = Animal();
  animal.color = "brown";
  print(animal.color);
  animal.eat();
}

class Animal {
  String color;
  void eat() {
    print("eat");
  }
}

class Dog extends Animal {
  // String color;
  String name;
  void bark() {
    print("bark");
  }
  // void eat() {
  //   print("eat");
  // }
}

class Cat extends Animal {
  // String color;
  int age;
  void meow() {
    print("meow");
  }
  // void eat() {
  //   print("eat");
  // }
}
~~~



### 重写父类方法和属性

~~~dart
void main() {
  var dog = Dog();
  print(dog.color);
}

class Animal {
  String color = "yellow";
  void eat() {
    print("eat");
  }
}

class Dog extends Animal {
  String color = "red";
  String name;
  void bark() {
    print("bark");
  }
}

class Cat extends Animal {
  // String color;
  int age;
  void meow() {
    print("meow");
  }
}

// 打印
red
~~~



## Widget

布局 widget（可见）

可见 widget（不可见）





### 简单的一个应用



### 颜色和字体

[material 官网](https://material.io/design)  =>`Design` => `Color` => `Tools for picking colors`

[谷歌字体库](http://www.googlefonts.cn/)   选择字体`zip`包，解压后，将`ttf`文件放到`/fonts`文件夹下

`pubspec.yaml`配置

~~~yaml
fonts:
	- family: IndieFlower
	fonts:
		- asset: fonts/IndieFlower.ttf
		
	- family: KirangHaerang-Regular
    fonts:
        - asset: fonts/KirangHaerang-Regular.ttf
~~~



### 热加载和无状态`widget`

1. `hot reload`

   需要用到无状态的`widget`

   ~~~dart
   class Home extends StatelessWidget {
     @override // 强类型语言中，重写父类的方法，起到提醒作用
     Widget build(BuildContext context) {
       return Container();
     }
   }
   ~~~

   ~~~dart
   import 'package:flutter/material.dart';
   
   void main() => runApp(MaterialApp(home: Home()));
   
   class Home extends StatelessWidget {
     @override
     Widget build(BuildContext context) {
       return Scaffold(
         appBar: AppBar(
           title: Text("海贼王new"),
           centerTitle: true,
           backgroundColor: Colors.red[600],
         ),
         body: Center(
           child: Text("new world!",
           style: TextStyle(
             fontSize: 20.0,
             fontWeight: FontWeight.bold,
             letterSpacing: 2.0,
             color: Colors.grey[600],
             fontFamily: "IndieFlower",
           ),),
         ),
         floatingActionButton: FloatingActionButton(
           onPressed: null,
           child: Text("点击"),
           backgroundColor: Colors.red[600],
         ),
       );
     }
   }
   ~~~

   

2. 无状态`widget`

~~~html
widget 设计的时候不可变
无状态 widget：image
有状态 widget: checkbox
~~~



### 图片

1. 网络图片

   ~~~dart
   // 两种都可
   body: Center(
       // child: Image.network(
       //     "https://images.pexels.com/photos/1553962/pexels-photo-1553962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
       child: Image(
           image: NetworkImage(
               "https://images.pexels.com/photos/1553962/pexels-photo-1553962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"),
       ),
   ),
   ~~~

   

2. 本地图片

   `pubspec.yaml`配置

   ~~~yaml
    # 表示文件夹下面的所有图片，也可具体到图片
    assets:
    - assets/images/
   ~~~

   ~~~dart
   body: Center(
       child: Image(
           image: AssetImage("assets/images/image.jpeg"),
       ),
   ),
   ~~~

   

### 图标和按钮

1. 图标

   ~~~dart
   body: Center(
       child: Icon(
           Icons.add_a_photo,
           color: Colors.red,
           size: 100.0,
       ),
   ),
   ~~~

2. 按钮

   (1) 普通按钮

   ~~~dart
   body: Center(
       child: RaisedButton(
           onPressed: () {
               print("321 茄子");
           },
           child: Text("拍照"),
           color: Colors.red,
       ),
   ),
   ~~~

   （2）带图标的按钮

   ~~~dart
   body: Center(
       child: RaisedButton.icon(
           onPressed: () {
               print("我是带图标的按钮");
           },
           icon: Icon(Icons.mail),
           label: Text("mail me"), // 一定要有这个
           color: Colors.red,
       ),
   ),
   ~~~

   （3）按钮图标

   ~~~dart
   body: Center(
       child: IconButton(
           icon: Icon(Icons.add_call),
           onPressed: () {
               print("call me");
           },
           color: Colors.red[800],
           iconSize: 98.0,
       ),
   ),
   ~~~

### 两种容器

1.  `Container`

~~~dart
body: Container(
    child: Text("hello world"),
    color: Colors.grey[400],
    // 三种方式设置 padding
    // padding: EdgeInsets.all(90.0),
    // padding: EdgeInsets.fromLTRB(10.0, 20.0, 30.0, 40.0),
    padding: EdgeInsets.symmetric(vertical: 30.0, horizontal: 40.0),
),
~~~

2. `Padding`（带有内边距的容器）

~~~dart
body: Padding(
    padding: EdgeInsets.all(60.0),
    child: Text("new world"),
),
~~~



### 行内布局

~~~dart
body: Row(
    // 主轴对齐方式（与 flex 类似）
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    // 交叉轴对齐方式（用 baseline 会报错）
    crossAxisAlignment: CrossAxisAlignment.stretch, // 在交叉轴上拉伸
    children: <Widget>[
        Text("hi lucky"),
        FlatButton(
            onPressed: () {},
            color: Colors.amber,
            child: Text("按钮"),
        ),
        Container(
            color: Colors.cyan,
            padding: EdgeInsets.all(30.0),
            child: Text("这是 Container")
        )
    ],
),
~~~



### 列布局

~~~dart
body: Column(
    mainAxisAlignment: MainAxisAlignment.end,
    crossAxisAlignment: CrossAxisAlignment.end,
    children: <Widget>[
        Row(
            children: <Widget>[
                Text("hihiihihi"),
                Text("wwwworld")
            ],
        ),
        Container(
            color: Colors.blue,
            padding: EdgeInsets.all(20.0),
            child: Text("one")
        ),
        Container(
            color: Colors.cyan,
            padding: EdgeInsets.all(30.0),
            child: Text("two")
        ),
        Container(
            color: Colors.red,
            padding: EdgeInsets.all(40.0),
            child: Text("three")
        )
    ],
),

// 注意： 宽度以最宽的元素为准，以此来对齐
~~~

### flex

~~~dart
// Expanded 相当于 flex-grow: 1 (拉伸)
// 用 flex 给相对比例
body: Row(children: <Widget>[
    // 加图片
    Expanded(
        flex: 2,
        child: Image.asset("assets/images/image.jpeg"),
    ),
    Expanded(
        flex: 1,
        child: Container(
            child: Text("1"),
            color: Colors.cyan,
            padding: EdgeInsets.all(30.0),
        ),
    ),
    Expanded(
        flex: 2,
        child: Container(
            child: Text("2"),
            color: Colors.amber,
            padding: EdgeInsets.all(30.0),
        ),
    ),
    Expanded(
        flex: 3,
        child: Container(
            child: Text("3"),
            color: Colors.red,
            padding: EdgeInsets.all(30.0),
        ),
    ),
]),
~~~



### 个人名片 demo

~~~dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: Home()));

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text("个人介绍"),
        centerTitle: true,
        backgroundColor: Colors.grey[850],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Center(
              child: CircleAvatar(
                // backgroundImage: AssetImage("assets/images/image.jpeg")
                radius: 40.0,
              ),
            ),
            Divider(
              height: 60.0,
              color: Colors.grey[800],
            ),
            Text("姓名",
                style: TextStyle(color: Colors.grey, letterSpacing: 2.0)),
            SizedBox(height: 10.0),
            Text("妞妞",
                style: TextStyle(
                    color: Colors.amberAccent[200],
                    fontWeight: FontWeight.bold,
                    fontSize: 28.0)),
            SizedBox(height: 30.0),
            Text("公司",
                style: TextStyle(color: Colors.grey, letterSpacing: 2.0)),
            SizedBox(height: 10.0),
            Text("阿里巴巴 新零售",
                style: TextStyle(
                    color: Colors.amberAccent[200],
                    fontWeight: FontWeight.bold,
                    fontSize: 28.0)),
            SizedBox(height: 30.0),
            Text("岗位",
                style: TextStyle(color: Colors.grey, letterSpacing: 2.0)),
            SizedBox(height: 10.0),
            Text("Node.js 开发",
                style: TextStyle(
                    color: Colors.amberAccent[200],
                    fontWeight: FontWeight.bold,
                    fontSize: 28.0)),
            SizedBox(height: 30.0),
            Row(
              children: <Widget>[
                Icon(Icons.email, color: Colors.grey[400]),
                SizedBox(width: 10.0),
                Text(
                  "xujing_xj@foxmail.com",
                  style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 18.0,
                      letterSpacing: 2.0),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}

~~~



### 有状态的 `widget`

~~~dart
class Homee extends StatefulWidget {
  @override
  _HomeeState createState() => _HomeeState();
}

class _HomeeState extends State<Homee> {
  @override
  Widget build(BuildContext context) {
    return Container(); // 和无状态的一样，可以把内容放在这里
  }
}
~~~

> 可以使用 IDE 的小灯泡 ，直接把个人名片 demo 转成有状态 （convert to ）



~~~dart
使用 setState 更改状态
改变状态需要重启
~~~



### 使用列表数据

~~~dart
class _HomeState extends State<Home> {
//  定义一个列表
  List<String> datas = ["hello world", "hello flutter", "hello niuniu"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text("个人介绍"),
        centerTitle: true,
        backgroundColor: Colors.grey[850],
      ),
      body: Column(
//        children: datas.map((data){
//          return Text(data);
//        }).toList(),
        children: datas.map((data) => Text(data)).toList(),
//        children: <Widget>[
//          Text("hello world"),
//          Text("hello flutter"),
//          Text("hello niuniu"),
//        ],
      ),
    );
  }
}
~~~



### 自定义对象数据



两种写法

~~~dart
class Datas {
  String text;
  String author;

  Datas({String text, String author}) {
    this.text = text;
    this.author = author;
  }
}

// 实例化
Datas myData = Datas(text: "hello", author: "niuniu");
~~~



~~~dart
class Datas {
  String text;
  String author;

  Datas({this.text, this.author}) {}
}
// 实例化
Datas myData = Datas(text: "hello", author: "niuniu");
~~~



~~~dart
class Datas {
  String text;
  String author;

  Datas({this.text, this.author});
}

class _HomeState extends State<Home> {
  List<Datas> datas = [
    Datas(text: "hello", author: "lucy"),
    Datas(text: "hello", author: "niuniu"),
    Datas(text: "hello", author: "lufei"),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text("个人介绍"),
        centerTitle: true,
        backgroundColor: Colors.grey[850],
      ),
      body: Column(
//        children: datas.map((data){
//          return Text(data);
//        }).toList(),
        children:
            datas.map((data) => Text('${data.text}:${data.author}')).toList(),
//        children: <Widget>[
//          Text("hello world"),
//          Text("hello flutter"),
//          Text("hello niuniu"),
//        ],
      ),
    );
  }
}
~~~



### 封装 `widget`

### 优化封装卡片

通过`flutterOutline` 把封装的 `Widget` 右击 `Extract Widget`

分别抽离了出`datas_card.dart`（自己的卡片 `widget`）和 `datas.dart`（定义了类）



### 事件传递

注意：

1. 无状态的 `Widget`里面定义的数据最好使用关键字

~~~dart
表示数据不可变：
final Datas data;
final Function delete;
~~~

2. 数据在哪里，操作就在哪里

   在 `datas_card.dart` 里面注册事件

   在`main.dart`里面执行事件



## 重构项目

目录结构：

`pages/home.dart`

`pages/choose_location.dart`

`pages/loading.dart`

`pages/home.dart`

~~~dart
import 'package:flutter/material.dart';


class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: Text("home screen")), // SafeArea Widget 从状态栏下面开始
    );
  }
}

~~~



## 使用路由

~~~dart
// 配置路由
initialRoute: "/home",
routes: {
    "/": (context) => Loading(),
    "/home": (context) => Home(),
    "/location": (context) => ChooseLocation()
},

onPressed: () {
    Navigator.pushNamed(context, "/location"); // 使用 Navigator 跳转
},
// 跳转到新的页面相当于在原有页面加了一个，appBar 里面会默认又返回按钮
~~~



## 生命周期函数

1. 无状态的`Widget`
   1. 整个周期所定义的状态不会发生变化
   2. 所创建的函数只会运行一次

2. 有状态的`Widget`
   1. 整个周期状态是可以发生变化的
   2. 可以通过`setState`实现状态更新

- `initSate()` `Widget`被创建时执行（一次）
- `Build()` 构建渲染`Widget`，一旦使用`setState()`就会执行`Build()`
- `Dispose()`  `Widget`被删除，就会触发



## 代码异步操作

`async` 和 `await` 注意配合`Future`使用



## http 模块

搜索`Dart packages` 相当于使用`npm`包、插件

在这里搜`http`

按照文档复制到`pubspec.yaml`

然后安装

测试接口`jsonplaceholder`



## World Time API

[世界时间 API 网址](http://worldtimeapi.org/)





## 封装请求