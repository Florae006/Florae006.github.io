# 2024杭电钉耙编程联赛Day1||补题


## 1001-循环位移

### 题意

将字符串$S=S_0+S_1+S_2+...+S_{n-1}$循环位移$k$次后得到$S(k)=S_{k\bmod n }+...+S_{n-1}+S+0+...+S_{(k-1)\bmod n}$。

定义$[A]={A(k),k\in N}$。给出$T$组串$A,B$，询问$B$有多少个子串在$[A]$​中。

#### 数据范围

* $|A|\leq |B|$
* $\sum|B|\leq 1048576$

### 思路

#### 思路1：字符串哈希

记字符串$A$的长度是$n$，将字符串$A$转变为首尾相连的样子（$A=A+A.substr(1,n-1)$），并计算其中每个长度为$n$的哈希值，用map存值，再对字符串$B$进行哈希，同样也对长度为$n$的子串计算哈希值，若有符合的则计数。

### 代码

#### 代码1：字符串哈希

```cpp
ll ha[maxn], hb[maxn];
ll pwr[maxn];

void solve() {
    string a, b;cin >> a >> b;
    ll n = a.size();
    a = a.substr(1, n - 1) + a;
    ll la = a.size(), lb = b.size();
    a = " " + a, b = " " + b;
    pwr[0] = 1;
    map<ll, bool>mp;
    for (ll i = 1;i <= la;i++) {
        ha[i] = ha[i - 1] * bas1 + a[i];
        pwr[i] = pwr[i - 1] * bas1;
        if (i - n >= 0) {
            ll x = ha[i] - ha[i - n] * pwr[n];
            mp[x] = true;
        }
    }
    ll ans = 0;
    for (ll i = 1;i <= lb;i++) {
        hb[i] = hb[i - 1] * bas1 + b[i];
        if (i - n >= 0) {
            ll x = hb[i] - hb[i - n] * pwr[n];
            if (mp.count(x)) {
                ans++;
            }
        }
    }
    cout << ans << endl;
}
```

## 1002-星星

### 题意

小$A$有$n$次获得星星的机会，第$i$次有如下5种选择：

* 跳过
* $a_i$的代价获得$1$颗星星
* $b_i$的代价获得$2$颗星星
* $c_i$的代价获得$3$颗星星
* $d_i$的代价获得$4$颗星星

请问若想恰好获得$k$颗星星，所需要的最小代价是多少。

#### 数据范围

* $1\leq n\leq 1000$
* $0\leq k\leq n\times 4$
* $0\lt a_i\leq b_i\leq c_i\leq d_i\leq 10^9$

### 思路

基础的动态规划。记$dp[i]$表示获得$i$颗星星的最小代价。

### 代码

```cpp
ll a[maxn], b[maxn], c[maxn], d[maxn];
ll dp[4 * maxn];

void solve() {
    ll n, k;cin >> n >> k;
    for (ll i = 1;i <= n;i++) {
        cin >> a[i] >> b[i] >> c[i] >> d[i];
    }
    fill(dp, dp + 4 * maxn, inf);
    dp[0] = 0;
    for (ll i = 1;i <= n;i++) {
        ll m = min(k, 4 * i);
        for (ll j = m;j >= 0;j--) {
            if (j + 1 <= m)
                dp[j + 1] = min(dp[j] + a[i], dp[j + 1]);
            if (j + 2 <= m)
                dp[j + 2] = min(dp[j] + b[i], dp[j + 2]);
            if (j + 3 <= m)
                dp[j + 3] = min(dp[j] + c[i], dp[j + 3]);
            if (j + 4 <= m)
                dp[j + 4] = min(dp[j] + d[i], dp[j + 4]);
        }
    }
    cout << dp[k] << "\n";
}
```

## 1008-位运算

### 题意

有多少在范围$[0,2^k)$中的$a,b,c,d$构成的四元组$(a,b,c,d)$满足$a \\& b\oplus c | d=n$。

#### 数据范围

* $1\leq T\leq 10$
* $1\leq k\leq 15,0\leq n\lt 2^k$

### 思路

记$x=a \\& b\oplus c | d$，$x$的每一位只有1和0的可能，而每位上的数字只和$a,b,c,d$对应位是$1$或$0$有关，枚举四个数的$1/0$，统计$x$是$0$的组合和是$1$的组合的数量。再根据$n$的$k$位进行统计即可。

### 代码

```cpp
void solve() {
    ll n, k;cin >> n >> k;
    ll cnt[2];cnt[0] = cnt[1] = 0;
    for (int i = 0;i <= 1;i++) {
        for (int j = 0;j <= 1;j++) {
            for (int k = 0;k <= 1;k++) {
                for (ll l = 0;l <= 1;l++) {
                    ll x = i & j ^ k | l;
                    cnt[x]++;
                }
            }
        }
    }
    vector<int>v;
    ll ans = 1;
    for (ll i = 0;i < k;i++) {
        v.push_back(n & 1);
        ans *= cnt[n & 1];
        n >>= 1;
    }
    cout << ans << "\n";
}
```
























