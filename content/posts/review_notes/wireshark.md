+++
title = 'Wireshark抓包实验'
date = 2024-01-07T21:59:47+08:00
draft = true
categories = [
    '在做实验的日子里'
]
+++

## 实验内容

1.主观题 (10 分 )
    下载wireshark软件，下载地址：
```plaintext
https://www.wireshark.org/download.html
```

2.       学习wireshark的使用，可以参见：
```plaintext
https://blog.csdn.net/wanqianshao/article/details/121688668

https://zhuanlan.zhihu.com/p/631821119

https://zhuanlan.zhihu.com/p/258195690
```
或者其他相关链接

3.       完成以下任务：

- 基本数据捕获：访问东北师范大学主页www.nenu.edu.cn，并使用自己的用户名密码登录融合门户。捕获该过程数据包。

- 基本数据分析：选取上一步捕获的数据包中的任意一个，说明主界面中每个字段的含义。

- 进一步数据分析：对于上一步选取的数据包，说明每一层数据头部的详细信息，尤其重点说明IP和TCP数据头部信息。

- 显示过滤规则使用：在访问学校主页捕获的数据包中完成以下练习：

（1）协议过滤；【如http、tcp】

（2）IP过滤【如：ip.src == *.*.*.*】

（3）端口过滤【如：tcp.srcport == 443】

（4）http模式过滤【如：http.request.method == ”GET“】

（5）带有逻辑运算符的过滤【如：ip.addr == *.*.*.* and tcp】

- 数据流跟踪：在访问学校主页捕获的数据包中完成以下练习：

（1）跟踪一个HTTP/TCP流

（2）在Endpoints/ Conversions窗口中，可以通过排序判断占用带宽最大的主机（本步为选做，可以不做）

 

实验任务及实验报告撰写要求：完成以上9个步骤，每步1分。本次报告没有具体格式，报告主要内容为：每个步骤的结果截图和/或相关文字进行说明。截图需要给出图的编号和标题（格式如：图1. 访问学校主页捕获的数据包）。最后给出实验总结，1分（给出实验收获和遇到问题时的解决方法）

 ## 我的实践

下载wireshark就很简单，官网找到download然后下载一路next就行，也没有什么注意点。那么就跳过下载安装的过程啦。

图标长这样（还挺可爱的）：

![1694956710943](1694956710943-1704636529559-38.png)

我们直接打开wireshark可以看到这个页面：

![1694956752804](1694956752804-1704636557338-40.png)

在这个界面设置我们这次抓取的数据来源之类的，我们选择要抓包的网卡，这里我就选择`WLAN`。

### 显示过滤规则使用

#### 协议过滤(1分)

![1695288965673](1695288965673-1704636508537-36.png)

#### IP过滤(1分)

如果只是设置了抓包哪个网卡，我们就会发现抓到的东西真的好多哦好复杂，所以我们就需要设置一个过滤器——也就是上图就能很容易找到的right in the middle的小绿标，我们在其后面的过滤器输入框输入我们的过滤条件(当然了这个肯定是有语法的，有一大堆，不过这里就直接放符合本次目的的语句)：==`ip src host `+本机的源ip号==。

本机的源ip怎么找呢？

使用我们万能的cmd（快捷键win+R）查看我们的源ip号：

输入指令：==ipconfig/all==

它会给我们返回好多好多...

我们找到与我们刚才选择的网卡对应的部分：

![1694957371499](1694957371499-1704636495956-34.png)

上图的红框框部分的`IPv4 Address`就是我们要找的源ip了。（源ip会变动耶）

这样我们把刚刚的过滤语句组合好，填入，然后双击我们选择的网卡，或者直接回车whatever...就开始了以我们本机的源ip为发送端的抓包了。

![1694957522918](1694957522918-1704636482139-32.png)

抓包界面like this:

![1694957614422](1694957614422-1704636452502-27.png)

信息还是好多...那么我们再过滤一下...

我们这次尝试的是抓取我们的登录信息，所以我们再把内容限制在http请求中的post方式发送的请求范围内，这样我们又筛选了抓包的内容。

#### 端口过滤(1分)

![1695289048487](1695289048487-1704636440873-25.png)

#### http模式过滤(1分)

我们把第二次筛选的语句：`http.request.method == POST`填入上面的显示过滤器一栏中，然后回车。就会获得这样的界面：

![1694957947389](1694957947389-1704636429806-23.png)

变得很简洁~

接下来我们就去发送个请求然后抓包啦~

我们登录学校官网，然后登录试试看：

![1694958203380](1694958203380-1704636411481-21.png)

#### 带有逻辑运算符的过滤(1分)

![1695289117739](1695289117739-1704636399840-19.png)

### 基本数据捕获(1分)

当我们登录之后，就会发现抓到了一堆东西，这时候我们手动筛选一下就能找到我们发送请求的是哪个包了。如上图，通过对里面的信息进行判断，这几个大概就是刚刚登录进入学校官网相关的数据包了，我们挑选的时候点进数据包，找到这部分内容：`Hypertext Transfer Protocol`

![1694958485812](1694958485812-1704636387211-17.png)

点开之后可以看到这样的信息：

![1694958678808](1694958678808-1704636374997-15.jpg)

就能知道是学校官网来的数据啦。

我这里由浏览器保存了账户和密码等信息，所以这个抓包看到的信息是像这样的：来自于Cookie的内容：

![1694958798663](1694958798663-1704636359679-13.jpg)

由于我们学校还是用的https协议，会对数据进行加密，所以我们看到的data和我们输入的账户密码啊什么看起来一点也不像，所以这里再找一个http协议的网站测试(没错，就是我们学校刚搭建的NENU OJ)，这次我们成功看到了我们发过去了什么信息

这次抓到的数据包就是这样的：

![1694959125816](1694959125816-1704636347524-11.png)

当然了，password还是会简单加密一下的，但是用户名id啊这些信息就在`HTML Form URL Encodeed`这块内容里了qwq。

### 数据分析

我们以这个为例，分析一下数据。

#### 基本数据分析(1分)

这个包的结果长这样：

![1695281668557](1695281668557-1704636335132-9.png)

```plaintext
Frame 49: 858 bytes on wire (6864 bits), 858 bytes captured (6864 bits) on interface \Device\NPF_{AAE246C0-D5F7-4F2E-977F-3A0C2831A02E}, id 0
Ethernet II, Src: IntelCor_b5:27:b9 (a0:59:50:b5:27:b9), Dst: Tp-LinkT_c6:a2:59 (64:6e:97:c6:a2:59)
Internet Protocol Version 4, Src: 192.168.1.105, Dst: 39.101.69.154
Transmission Control Protocol, Src Port: 62920, Dst Port: 80, Seq: 2250, Ack: 5186, Len: 804
Hypertext Transfer Protocol
HTML Form URL Encoded: application/x-www-form-urlencoded
```

Packet Details Pane(数据包详细信息), 在数据包列表中选择指定数据包，在数据包详细信息中会显示数据包的所有详细信息内容。数据包详细信息面板是最重要的，用来查看协议中的每一个字段。各行信息分别为

（1）Frame: 物理层的数据帧概况	==物理层==

（2）Ethernet II: 数据链路层以太网帧头部信息	==数据链路层==

（3）Internet Protocol Version 4: 互联网层IP包头部信息	==传输层==

（4）Transmission Control Protocol: 传输层T的数据段头部信息，此处是TCP	==传输层==

（5）Hypertext Transfer Protocol: 应用层的信息，此处是HTTP协议	==应用层==

  (6)  HTML Form URL Encoded

附上网络协议层次图：

![tcp/ip五层模型组成、封装、常用协议示意图 - 极客分享](https://img-blog.csdnimg.cn/20200224191737902.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMwNDM1OTQx,size_16,color_FFFFFF,t_70)



#### 进一步数据分析(1分)

先附上数据包的结构图：

![TCP/IP协议到底在讲什么？ - 知乎](https://pic2.zhimg.com/v2-b336a50e1d671a5ef82f532c492474fe_r.jpg?source=1940ef5c)

在==Internet Protocol Version 4==中是这样的内容：

![1695285496309](1695285496309-1704636315028-7.png)

文本复制：

```cpp
Internet Protocol Version 4, Src: 192.168.1.105, Dst: 39.101.69.154
    0100 .... = Version: 4		// 版本
    .... 0101 = Header Length: 20 bytes (5)		// IP包头长度
    Differentiated Services Field: 0x00 (DSCP: CS0, ECN: Not-ECT)
        0000 00.. = Differentiated Services Codepoint: Default (0)
        .... ..00 = Explicit Congestion Notification: Not ECN-Capable Transport (0)
    Total Length: 844		// IP包总长度
    Identification: 0x7e12 (32274)
    010. .... = Flags: 0x2, Don't fragment		// 不分片的标志
        0... .... = Reserved bit: Not set
        .1.. .... = Don't fragment: Set
        ..0. .... = More fragments: Not set
    ...0 0000 0000 0000 = Fragment Offset: 0
    Time to Live: 128		// TTL值
    Protocol: TCP (6)		// 下层类型是TCP协议
    Header Checksum: 0x0000 [validation disabled]
    [Header checksum status: Unverified]
    Source Address: 192.168.1.105		// 源ip地址
    Destination Address: 39.101.69.154		// 目标ip地址

```



在==Transmission Control Protocol（TCP）==中是这样的内容：

![1695281799792](1695281799792-1704636298572-5.png)

文本粘贴：

```cpp
Transmission Control Protocol, Src Port: 62920, Dst Port: 80, Seq: 2250, Ack: 5186, Len: 804
    Source Port: 62920			// 源端口号
    Destination Port: 80		// 目的端口号
    [Stream index: 8]
    [Conversation completeness: Incomplete (28)]
    [TCP Segment Len: 804]
    Sequence Number: 2250    (relative sequence number)			// 32位序列号
    Sequence Number (raw): 3531770680
    [Next Sequence Number: 3054    (relative sequence number)]
    Acknowledgment Number: 5186    (relative ack number)		// 32位确认序列号
    Acknowledgment number (raw): 1396566384
    0101 .... = Header Length: 20 bytes (5)				// 4位首部长度
    Flags: 0x018 (PSH, ACK)							// 标志位 ACK置1
        000. .... .... = Reserved: Not set				// 保留位
        ...0 .... .... = Accurate ECN: Not set			// 新增的
        .... 0... .... = Congestion Window Reduced: Not set		// 新增的
        .... .0.. .... = ECN-Echo: Not set				// 新增的
        .... ..0. .... = Urgent: Not set
        .... ...1 .... = Acknowledgment: Set
        .... .... 1... = Push: Set
        .... .... .0.. = Reset: Not set
        .... .... ..0. = Syn: Not set
        .... .... ...0 = Fin: Not set
        [TCP Flags: ·······AP···]
    Window: 1024			// 窗口
    [Calculated window size: 1024]
    [Window size scaling factor: -1 (unknown)]
    Checksum: 0x324f [unverified]				// 16位检验和
    [Checksum Status: Unverified]
    Urgent Pointer: 0							// 16位紧急指针
    [Timestamps]
        [Time since first frame in this TCP stream: 2.273863000 seconds]
        [Time since previous frame in this TCP stream: 1.958815000 seconds]
    [SEQ/ACK analysis]
        [Bytes in flight: 3053]
        [Bytes sent since last PSH flag: 804]
    TCP payload (804 bytes)					// TCP有效载荷
```



### 数据流跟踪(1分)

我们选择要追踪的数据流，右键选择追踪流->追踪HTTP/TCP 

我们重新抓包，这次过滤条件设置为：

```
ip host www.nenu.edu.cn
```

然后随便点一个进行数据流追踪：

![1695288522077](1695288522077-1704636275309-3.png)

其中对话有红蓝之分：

![1695288647819](1695288647819-1704636264115-1.png)

红色表明是客户端发往服务器的对话，蓝色表明是服务器发往客户端的。



### 实验总结(1分)

本次实验学习了如何使用wireshark进行简单的抓包，在实验过程中学习了诸如过滤器设置、抓包数据分析等内容，在实验中，我充分利用网上资源学习了如何实现我想要的功能，比如确定ip地址、数据分析、如何跟踪想要的数据流等等。
