# 线段树专题练习


{{< admonition abstract "前言" true>}}

痛定思痛练习线段树QAQ。

{{< /admonition >}}

此篇包含尚未写完的题，事实上是一个**TODO List**。

### TODO List

- [x] [Atlantis](https://acm.hdu.edu.cn/showproblem.php?pid=1542)
- [x] [P5490 【模板】扫描线 & 矩形面积并 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5490)
- [ ] [覆盖的面积](https://acm.hdu.edu.cn/showproblem.php?pid=1255)
- [ ] [P4588 TJOI2018 数学计算 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P4588)
- [ ] [单峰数列](https://acm.hdu.edu.cn/showproblem.php?pid=7463)
- [ ] [树上询问](https://acm.hdu.edu.cn/showproblem.php?pid=7530)
- [ ] [P1502 窗口的星星 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1502)
- [ ] [P2471 SCOI2007 降雨量 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P2471)


## Atlantis

[Problem - 1542 (hdu.edu.cn)](https://acm.hdu.edu.cn/showproblem.php?pid=1542)

### 题意

给出$x_1,y_1,x_2,y_2$，标志平面内的矩形的左上角坐标$(x_1,y_1)$和右下角坐标$(x_2,y_2)$​​，求这些矩形覆盖的总面积。

输出格式参照样例。

#### 数据范围

* $0\leq n\leq 100$
* $0\leq x_1\lt x_2\leq 10^5$
* $0\leq y_1\lt y_2\leq 10^5$

### 思路

记录每个矩阵的上下边，并给下边沿标记$1$，上边沿标记$-1$，扫描线从下向上扫描。

记录每条线的左右端点的$x$坐标，去重后进行离散化，用$X[]$数组记录出现过的$x$坐标，并做去重。

在去重之后的$X[]$数组上建立线段树（不包含最右侧端点），线段树中的每个节点记录该段节点代表的线段的左右端点在$X[]$中的下标，之后若该线段被覆盖，该节点代表的长度就是$X[posr+1]- X[posl]$，初始时每个节点记录的长度都是$0$（初始时均未被覆盖）。

扫描线从下到上扫描，每次都是先遇到某个矩阵的下边沿（标记为$1$的边），然后再遇到上边沿（标记为$-1$的边）。对于每次加边，更新线段树上的节点，当前被覆盖的长度$\times$当前扫描线与下一条扫描线的高度差即为这一部分的面积。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef double ld;
const int maxn = 2050;

struct line {
    int typ;
    double s, t, y;
    bool operator<(const line& l)const {
        return y < l.y; // 按照横坐标升序排序
    }
}line[maxn * 2];

struct node {
    int l, r;
    int cnt;
    double len;
}tree[maxn * 4];

double X[maxn * 2];

void build(int p, int l, int r) {
    tree[p] = { l,r,0,0 };
    if (l == r)return;
    int mid = l + (r - l) / 2;
    build(p * 2, l, mid);
    build(p * 2 + 1, mid + 1, r);
}

void pushup(int p) {
    int l = tree[p].l, r = tree[p].r;
    if (tree[p].cnt) { // 有覆盖
        tree[p].len = X[r + 1] - X[l];
    }
    else {
        tree[p].len = tree[p * 2].len + tree[p * 2 + 1].len;
    }
}

void editTree(int p, double l, double r, int c) {
    // 要修改的x区间:[l,r]
    int pl = tree[p].l, pr = tree[p].r; // 当前节点对应的左右坐标
    if (X[pl] >= l && X[pr + 1] <= r) { // 包含
        tree[p].cnt += c;
        pushup(p);
        return;
    }
    if (l >= X[pr + 1] || r <= X[pl])
        return;
    editTree(p * 2, l, r, c);
    editTree(p * 2 + 1, l, r, c);
    pushup(p);
}

int n;
int cas;
void solve() {
    cout << "Test case #" << ++cas << "\n";
    set<double>Xs;
    for (int i = 1;i <= n;i++) {
        double x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        line[i] = { 1,x1,x2,y1 }; // 下边
        line[i + n] = { -1,x1,x2,y2 }; // 上边
        Xs.insert(x1), Xs.insert(x2); // 离散化
    }
    sort(line + 1, line + 1 + 2 * n);
    int t = 0;
    for (auto p : Xs) {
        X[++t] = p;
    }
    build(1, 1, t - 1); // 对离散化的X轴建树
    double ans = 0.0;
    for (int i = 1;i < 2 * n;i++) { // 最后一条扫描线不用计入统计
        editTree(1, line[i].s, line[i].t, line[i].typ);
        ans += tree[1].len * (line[i + 1].y - line[i].y);
    }

    cout << "Total explored area: " << fixed << setprecision(2) << ans << "\n";
}

int main() {
    // ios::sync_with_stdio(false);
    // cin.tie(0);
    while (cin >> n && n)
        solve();

    return 0;
}
```

稍微改一下代码就能过这个题：[P5490 【模板】扫描线 & 矩形面积并 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P5490)

代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef double ld;
const int maxn = 1e6 + 50;

struct line {
    int typ;
    ll s, t, y;
    bool operator<(const line& l)const {
        return y < l.y; // 按照横坐标升序排序
    }
}line[maxn * 2];

struct node {
    int l, r;
    int cnt;
    ll len;
}tree[maxn * 4];

ll X[maxn * 2];

void build(int p, int l, int r) {
    tree[p] = { l,r,0,0 };
    if (l == r)return;
    int mid = l + (r - l) / 2;
    build(p * 2, l, mid);
    build(p * 2 + 1, mid + 1, r);
}

void pushup(int p) {
    int l = tree[p].l, r = tree[p].r;
    if (tree[p].cnt) { // 有覆盖
        tree[p].len = X[r + 1] - X[l];
    }
    else {
        tree[p].len = tree[p * 2].len + tree[p * 2 + 1].len;
    }
}

void editTree(int p, ll l, ll r, int c) {
    // 要修改的x区间:[l,r]
    int pl = tree[p].l, pr = tree[p].r; // 当前节点对应的左右坐标
    if (X[pl] >= l && X[pr + 1] <= r) { // 包含
        tree[p].cnt += c;
        pushup(p);
        return;
    }
    if (l >= X[pr + 1] || r <= X[pl])
        return;
    editTree(p * 2, l, r, c);
    editTree(p * 2 + 1, l, r, c);
    pushup(p);
}


void solve() {
    int n;cin >> n;
    set<ll>Xs;
    for (int i = 1;i <= n;i++) {
        ll x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        line[i] = { 1,x1,x2,y1 }; // 下边
        line[i + n] = { -1,x1,x2,y2 }; // 上边
        Xs.insert(x1), Xs.insert(x2); // 离散化
    }
    sort(line + 1, line + 1 + 2 * n);
    int t = 0;
    for (auto p : Xs) {
        X[++t] = p;
    }
    build(1, 1, t - 1); // 对离散化的X轴建树
    ll ans = 0ll;
    for (int i = 1;i < 2 * n;i++) { // 最后一条扫描线不用计入统计
        editTree(1, line[i].s, line[i].t, line[i].typ);
        ans += tree[1].len * (line[i + 1].y - line[i].y);
    }

    cout << ans << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int t = 1;
    // cin >> t;cin.tie(0);
    while (t--)
        solve();

    return 0;
}
```










