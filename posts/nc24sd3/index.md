# 2024牛客暑假多校训练营Day3||补题


## B-Crash Test

### 题意

小车有$n$个引擎，第$i$个引擎可以让车前进$h[i]$米。在小车起点正前方距离为$D$处有一反弹墙面，小车如果撞在墙上将会被回弹与当前剩余的前进米数相同的距离，并保持车头朝向墙面。小车可以使用任意引擎任意次，询问距离墙面最近的距离是多少。

#### 数据范围

* $1\leq n\leq 100$
* $1\leq D \leq 10^{18}$
* $1\leq h[i]\leq 10^{18}$

### 思路

假设当前选择了某个引擎，并只使用这个引擎，易知，我们可以将距离$d$减小到$\min(d\bmod h[i],h[i]-d\bmod h[i])$。

接下来选择另一种引擎，在刚才的基础上，我们可以将距离减小到$\min(d\bmod h[i+1],h[i+1]-d\bmod h[i+1])$。

设$gcd(h[i],h[i+1])=k$，$h[i]=ak,h[i+1]=bk$，则$d$的变化其实是这样的：
$$
d_1&=&\min(d_0\bmod ak,d_0-d_0\bmod ak)\\\\
&=&\min(d_0\bmod k,d_0-d_0\bmod k)\\\\
d_2&=&\min(d_1\bmod bk,d_1-d_1\bmod bk)\\\\
&=&\min(d_1\bmod k,d_1-d_1\bmod k)\\\\
&=&d_1\\\\
&=&\min(d_0\bmod k,d_0-d_0\bmod k)\\\\
&&.......
$$
观察结果，可以发现最小的$|dis-d|$之和所有引擎的$gcd$有关，计算$h[]$数组的$gcd$即可。

### 代码

```cpp
void solve() {
    ll n, d;cin >> n >> d;
    vector<ll>h(n + 1);
    for (ll i = 1;i <= n;i++) {
        cin >> h[i];
    }
    sort(h.begin() + 1, h.end());
    ll x = h[n];
    for (ll i = n;i >= 1;i--) {
        x = gcd(x, h[i]);
    }
    cout << min(d % x, x - d % x) << endl;
}
```

## D-Dominoes!

### 题意

一张多米诺骨牌的左右两端各有一个数字，给出$n$张这样的多米诺骨牌，是否存在一个可以另所有相邻且不在同一张牌上的两个数字不一样的序列。

#### 数据范围

* $1\leq n\leq 2\times 10^5$
* $1\leq x_i,y_i\leq 10^9$

### 思路

首先注意到当 某个数字的数量大于等于$n+2$时，一定没有合法的排列。

![af2ebec141701b271fd4041e35db8f45](https://img.dodolalorc.cn/i/2024/07/27/66a4d60c0f2cc.png)

而如果符合$\lt n+2$，一定有合法序列。

如果所有骨牌都满足$x_i\neq y_i$，则只要满足每次从两侧加入的牌相邻没有相同数字即可，一定有合法序列。

优先考虑排列$x_i=y_i$的骨牌。将$x_i = y_i$的骨牌按照数量从大到小排序，每次选择一张牌，假设这张牌的数字是$p$，之后选择现存数量最多的且符合$x_j = y_j\neq p$的一张牌，放在右侧，接下来继续取两侧相同骨牌中数目最多的，若两侧相同骨牌数目不足$2$种，则加入任意两侧不同的牌，注意接触端的条件

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll maxn = 2e5 + 50;

struct Domi {
    ll x, y;

    bool operator==(const Domi& d)const {
        return tie(x, y) == tie(d.x, d.y);
    }
    bool operator!=(const Domi& d)const {
        return tie(x, y) != tie(d.x, d.y);
    }
    bool operator<(const Domi& d)const {
        return tie(x, y) < tie(d.x, d.y);
    }
};

bool compare(const pair<ll, Domi>& a, const pair<ll, Domi>& b) {
    if (a.first == b.first)return a.second < b.second;
    return a.first > b.first;
}

void solve() {
    ll n;cin >> n;
    vector<Domi>v, w;
    map<ll, ll>cnt;
    for (ll i = 1;i <= n;i++) {
        ll x, y;cin >> x >> y;
        if (x > y) { x = x ^ y, y = x ^ y, x = x ^ y; }
        cnt[x]++, cnt[y]++;
        if (x == y)
            v.push_back({ x,y });
        else
            w.push_back({ x,y });
    }
    ll lv = v.size();
    ll lw = w.size();


    for (auto i : cnt) {
        if (i.second >= n + 2) {
            cout << "No\n";
            return;
        }
    }
    cout << "Yes\n";

    if (n == 1) {
        struct Domi d;
        if (v.empty()) {
            d = w.back();
        }
        else {
            d = v.back();
        }
        cout << d.x << " " << d.y << "\n";
        return;
    }

    sort(v.begin(), v.end());
    ll c = 1;
    priority_queue<pair<ll, Domi>>pris;
    for (ll i = 1;i < lv;i++) {
        if (v[i] != v[i - 1]) {
            pris.push({ c,v[i - 1] });
            c = 1;
        }
        else {
            c++;
        }
    }
    if (lv) {
        pris.push({ c,v.back() });
    }

    vector<Domi>ans;
    ll pw = 0;
    ll las = -1;
    while (!pris.empty() || pw < lw) {
        if (pris.empty()) {
            struct Domi x = w[pw++];
            if (x.x == las) {
                x = { x.y,x.x };
            }
            ans.push_back(x);
            las = x.y;
            continue;
        }

        auto [cntx, x] = pris.top();pris.pop();
        if (las != x.x) {
            cntx--;
            if (cntx) {
                pris.push({ cntx,x });
            }
            ans.push_back(x);
            las = x.y;
            continue;
        }

        if (pris.empty()) {
            pris.push({ cntx,x });
            x = w[pw++];
            if (x.x == las) {
                x = { x.y,x.x };
            }
            ans.push_back(x);
            las = x.y;
            continue;
        }

        auto [cnty, y] = pris.top();pris.pop();
        pris.push({ cntx,x });
        cnty--;
        if (cnty) {
            pris.push({ cnty,y });
        }
        ans.push_back(y);
        las = y.y;
    }

    for (auto i : ans) {
        cout << i.x << " " << i.y << "\n";
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int t = 1;
    // cin >> t;cin.get();
    while (t--)solve();

    return 0;
}
```



## L-Sudoku and Minesweeper

### 题意

给出一个$9\times 9$的数独，在这个数独的基础上构造一个扫雷地图，将数独上的一些数字替换为`*`，但是不能将所有数字都替换为`*`，使得整个扫雷地图合法。

### 思路

在铺满地雷的地图上保留一些数字，数字`8`表明该格周围都是`*`，所以选择保留所有的`8`，并再次遍历一遍所有的地图（注意边界），删掉不符合要求的`8`。

或者另一个想法：中间$3\times 3$的格子中中一定有一个数字`8`，在去掉除了这个`8`以外的所有数字之后，这个`8`一定是符合要求的。

### 代码

```cpp
char mp[10][10];

void solve() {
    for (int i = 1;i <= 9;i++) {
        for (int j = 1;j <= 9;j++) {
            cin >> mp[i][j];
            if (mp[i][j] != '8')mp[i][j] = '*';
        }
    }
    vector<pair<int, int>>dxy = {
        {-1,-1},{-1,0},{-1 ,1},
        {0,-1},{0 ,1},
        {1,-1},{1,0},{1 ,1},
    };
    for (int i = 1;i <= 9;i++) {
        for (int j = 1;j <= 9;j++) {
            if (mp[i][j] == '*')continue;
            int x = mp[i][j] - '0';
            int y = 0;
            for (int k = 0;k < 8;k++) {
                int ii = i + dxy[k].first, jj = j + dxy[k].second;
                if (ii >= 1 && ii <= 9 && jj >= 1 && jj <= 9)
                    if (mp[ii][jj] == '*') { y++; }
            }
            if (x != y)mp[i][j] = '*';
        }
    }
    for (int i = 1;i <= 9;i++) {
        for (int j = 1;j <= 9;j++) {
            cout << mp[i][j];
        }
        cout << "\n";
    }
}
```






