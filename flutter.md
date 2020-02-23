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

