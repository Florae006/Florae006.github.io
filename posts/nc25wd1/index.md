# 2025牛客暑寒假多校训练营Day1||补题


## A 茕茕孑立之影

### 题意

找一个不超过$1e18$数$x$，使得$x$既不是任何$a_i$的倍数，也不是任何$a_i$的因数。若没有输出$-1$。

#### 数据范围

- $1\leq n\leq 1e5$
- $1\leq a_i\leq 1e9$

### 思路

观察到，如果数组中有$1$则不存在这样的数。
$1\leq a_i\leq 1e9$，而$1\leq x\leq 1e18$，有解时任意数=输出一个大于$1e9$的质数即可。

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  for (ll i = 1; i <= n; i++) {
    cin >> a[i];
  }
  sort(a + 1, a + 1 + n);
  if (a[1] == 1) {
    cout << "-1\n";
  } else {
    cout << "100000007\n";
  }
}
```

## B 一气贯通之刃

### 题意

给一棵树，寻找一条简单路径，使之遍历树上所有的顶点，输出起点和终点。如果没有这样的解则输出$-1$。

_简单路径是指这样一条路径，其经过的顶点和边互不相同。_

#### 数据范围

- $2\leq n\leq 1e5$
- $1\leq u_i,v_i\leq n,u_i\neq v_i$

### 思路

只有整个树是一条链时，从一个叶子节点到另一个叶子节点，才能有符合要求的简单路径。

### 代码

```cpp
ll deg[maxn];
void solve() {
  ll n;
  cin >> n;
  for (ll i = 1; i <= n - 1; i++) {
    ll u, v;
    cin >> u >> v;
    deg[u]++, deg[v]++;
  }
  vector<ll> v;
  for (ll i = 1; i <= n; i++) {
    if (deg[i] == 1) {
      v.push_back(i);
    }
  }
  if (v.size() != 2) {
    cout << "-1\n";
  } else {
    cout << v[0] << ' ' << v[1] << '\n';
  }
}
```

## C 兢兢业业之移

### 题意

有一个$n\times n$的 01 矩阵，$n$是偶数，其中有刚好$\frac{n^2}{4}$个`1`，请将这些 1 全部移动到矩阵左上角的位置，即$1\leq i\leq \frac{n}{2},q\leq j\leq \frac{n}{2}$的位置，规定移动只能与共边的方格交换，交换次数不超过$\frac{n^3}{2}$。

#### 数据范围

- $2\leq n\leq 100$

### 思路

考虑一条移动路径将 1 移动到左上角某个 0 的位置，如果这个路径上有其他的 1，显然移动路径中间的 1 到同样的目标 0 位置的次数是更小的。

从左上角坐标点进行 bfs，最先碰到的 1 是最近的，还原 bfs 的路径。还原 bfs 的路径可以通过存储 bfs 时拓展的父节点来回溯获得。

或者考虑寻找最短路时，路径只可能是直线或者直角线，假设路径需要“拐弯”才能到达某个 1，那这个“拐弯”的地方肯定是 1。这样的路径的长度正好是曼哈顿距离，$n$比较小，可以遍历所有的 1 来选择举例要填的 0 最近的点。还原路径的时候按照先纵向再横向或者先横向再纵向都可以。

### 代码 1：曼哈顿距离

```cpp
ll n;
map<pll, bool> vis;
vector<pii> dxy = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
vector<array<ll, 4>> ans;
void solve() {
  cin >> n;
  ans.clear(), vis.clear();
  vector<pll> v;
  for (ll i = 1; i <= n; i++) {
    for (ll j = 1; j <= n; j++) {
      char c;
      cin >> c;
      if (c == '1') {
        v.push_back({i, j});
      }
    }
  }

  auto dis = [&](pll p1, pll p2) {
    return abs(p1.first - p2.first) + abs(p1.second - p2.second);
  };
  for (ll i = 1; i <= n / 2; i++) {
    for (ll j = 1; j <= n / 2; j++) {
      pll pi = {i, j};
      pll p = {10000, 10000};
      for (auto pj : v) {
        if (!vis.count(pj) && dis(pi, pj) < dis(pi, p)) {
          p = pj;
        }
      }
      vis[p] = true;
      auto [x, y] = p;
      while (x > i) {
        ans.push_back({x, y, x - 1, y}), x -= 1;
      }
      while (x < i) {
        ans.push_back({x, y, x + 1, y}), x += 1;
      }
      while (y > j) {
        ans.push_back({x, y, x, y - 1}), y -= 1;
      }
      while (y < j) {
        ans.push_back({x, y, x, y + 1}), y += 1;
      }
    }
  }

  cout << ans.size() << '\n';
  for (auto [q, w, e, r] : ans) {
    cout << q << ' ' << w << ' ' << e << ' ' << r << '\n';
  }
}
```

### 代码 2：宽搜

```cpp
ll n;
char maz[250][250];
vector<pii> dxy = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

bool vis[250][250], inq[250][250];
vector<array<ll, 4>> ans;

pii trace[250][250];

void solve() {
  cin >> n;
  ans.clear();
  vector<pii> v;
  for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
      cin >> maz[i][j];
      vis[i][j] = false;
    }
  }
  // bfs
  for (ll i = 1; i <= n / 2; i++) {
    for (ll j = 1; j <= n / 2; j++) {

      for (ll ii = 1; ii <= n; ii++) {
        for (ll jj = 1; jj <= n; jj++) {
          inq[ii][jj] = false;
        }
      }

      bool flag = false;
      pii o = {i, j};
      trace[i][j] = {i, j};

      queue<pii> q;
      q.push({i, j});
      inq[i][j] = true;
      while (!q.empty()) {
        pii pi = q.front();
        q.pop();
        if (maz[pi.first][pi.second] == '1') {
          o = pi;
          flag = true;
          break;
        }
        if (maz[pi.first][pi.second] == '1')
          break;
        for (auto [dx, dy] : dxy) {
          int px = pi.first + dx, py = pi.second + dy;
          if (px < 1 || px > n || py < 1 || py > n)
            continue;
          if (vis[px][py] || inq[px][py])
            continue;

          trace[px][py] = pi;
          if (maz[px][py] == '1') {
            o = {px, py};
            flag = true;
            break;
          }
          inq[px][py] = true;
          q.push({px, py});
        }
        if (flag)
          break;
      }
      // 必然有解的
      maz[o.first][o.second] = '0';
      // 路径还原
      while (o.first != i || o.second != j) {
        pii i = trace[o.first][o.second];
        ans.push_back({o.first, o.second, i.first, i.second});
        o = i;
      }
      maz[o.first][o.second] = '1';
      vis[i][j] = true;
    }
  }

  cout << ans.size() << '\n';
  for (auto [q, w, e, r] : ans) {
    cout << q << ' ' << w << ' ' << e << ' ' << r << '\n';
  }
}
```

## D 双生双宿之决

### 题意

双生数组定义：数组大小为偶数，有且只有 2 种数，这两种数的数量相同。

判断一个数组是不是双生数组。

#### 数据范围

- $1\leq n\leq 1e5$
- $1\leq a_i\leq 1e9$

### 思路

按性质判断即可。

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  map<ll, ll> mp;
  for (ll i = 1; i <= n; i++) {
    cin >> a[i];
    mp[a[i]]++;
  }
  if (mp.size() != 2) {
    cout << "No\n";
    return;
  }
  vector<pll> v(mp.begin(), mp.end());
  if (v[0].second == v[1].second) {
    cout << "Yes\n";
  } else {
    cout << "No\n";
  }
}
```

## E 双生双宿之错

### 题意

将一个数组变成双生数组，可以进行的操作是将某个数+1 或-1，求最小操作次数。

#### 数据范围

- $1\leq n\leq 1e5$
- $1\leq a_i\leq 1e9$

### 思路

首先想到，将数组分为小的一半和大的一半，这两半各找一个数作为双生数组中的标准数。
这个数是中位数：
考虑当前的中位数是$x$，代表有至少一半的数小于等于$x$，也有至少一半的数大于等于$x$，如果将$x$变成$x+1$，假设原来的花费是$y$，有$c$的数小于等于$x$。那么现在的花费是$y' = y+c-(n-c)$，由于$c\ge n/2$，故$y'\gt y$，$x-1$的情况也是同理。

特别的，当两边的中位数是同一个数的时候，需要对某一边进行+1 或-1，取 min。

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  for (ll i = 1; i <= n; i++) {
    cin >> a[i];
  }
  sort(a + 1, a + 1 + n);
  auto check = [&](ll x, ll l, ll r) {
    ll tot = 0;
    for (ll i = l; i <= r; i++) {
      tot += abs(x - a[i]);
    }
    return tot;
  };
  // 左右两半各找一个中位数
  ll x = a[(1 + n / 2) / 2];
  ll y = a[(n / 2 + 1 + n) / 2];
  ll ansx = check(x, 1, n / 2), ansy = check(y, n / 2 + 1, n);
  ll ans = ansx + ansy;
  if (x == y) {
    ans = inf;
    ans = min(ans, check(x + 1, 1, n / 2) + ansy);
    ans = min(ans, ansx + check(y + 1, n / 2 + 1, n));
    ans = min(ans, check(x - 1, 1, n / 2) + ansy);
    ans = min(ans, ansx + check(y - 1, n / 2 + 1, n));
  }
  cout << ans << '\n';
}
```

## F

### 题意

#### 数据范围

### 思路

### 代码

## G 井然有序之衡

### 题意

将数组变成一个排列，可以进行的操作是将某个数+1，同时将另一个数-1，询问最小操作次数，若不能实现则输出`-1`。

#### 数据范围

- $1\leq n\leq 1e5$
- $-1e9\leq a_i\leq 1e9$

### 思路

排列中的数是 1~n，如果进行操作，一定是将大数减去的 1 加到小数上，让两个数都趋向要变成的数。从 n 开始枚举到 1，如果当前的排列数$i$在数组中不存在，则选一个大于$i$的数，将它减去的数统计到答案中，过程中判断可行性。

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  ll tot = 0;
  multiset<ll, greater<>> st;
  for (ll i = 1; i <= n; i++) {
    cin >> a[i];
    tot += a[i];
    st.insert(a[i]);
  }
  if (tot != (1 + n) * n / 2) {
    cout << "-1\n";
    return;
  }
  ll ans = 0ll, x = n;
  while (!st.empty() && x >= 1) {
    if (st.find(x) != st.end()) {
      st.erase(st.find(x));
      x--;
      continue;
    }
    if (*st.begin() < x)
      break;
    ans += *st.begin() - x;
    x--;
    st.erase(st.begin());
  }
  cout << ans << '\n';
}
```

## H 井然有序之窗

### 题意

构造一个长度为 n 的排列，要求每个数$i$都符合在$[l_i,r_i]$范围内，如果不存在这样的排列，则输出-1，否则输出构造的排列。

#### 数据范围

- $1\leq n\leq 1e5$
- $1\leq l_i\leq r_i\leq n$

### 思路

按照 1~n 的顺序构造排列，每次从**可以使用的区间**中取**右端点最近**的区间。

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  vector<pair<pll, ll>> v;
  for (ll i = 1; i <= n; i++) {
    pll p;
    cin >> p.first >> p.second;
    v.push_back({p, i});
  }
  // 关键字顺序l,r,id
  sort(v.begin(), v.end());
  multiset<pair<ll, pair<pll, ll>>> st; // 右端点r小的排在前面
  ll pi = 0;
  for (ll x = 1; x <= n; x++) {
    for (; pi < (ll)v.size(); pi++) {
      pll p = v[pi].first;
      if (p.first <= x && p.second >= x) {
        st.insert({p.second, v[pi]});
        continue;
      }
      break;
    }
    if (st.empty()) {
      cout << "-1\n";
      return;
    }
    a[st.begin()->second.second] = x;
    st.erase(st.begin());
    while (!st.empty() && st.begin()->first == x) {
      st.erase(st.begin());
    }
  }
  for (ll i = 1; i <= n; i++) {
    cout << a[i] << " \n"[i == n];
  }
}
```

## I

### 题意

#### 数据范围

- $1\leq n\leq 1e5$

### 思路

### 代码

## J 硝基甲苯之袭

### 题意

在数组中选两个元素$a_i,a_j,(i\neq j)$，求满足$a_i \oplus a_j = gcd(a_i,a_j)$的$i,j$对数量。

#### 数据范围

- $1\leq n\leq 2e5$
- $1\leq a_i\leq 2e5$

### 思路

$x\oplus y = g$，则有$y=x\oplus g$，对每个$a_i$，枚举$g$，若有符合$g == gcd(x,x\oplus g)$的则计入答案，答案要去掉一半重复计数的。

### 代码

```cpp
ll a[maxn];
// 记录每个数的因数
vector<ll> MP[maxn];

void solve() {
  ll n;
  cin >> n;
  map<ll, ll> mp;
  for (ll i = 1; i <= n; i++) {
    cin >> a[i];
    mp[a[i]]++;
  }
  ll ans = 0ll;
  for (ll i = 1; i <= n; i++) {
    ll x = a[i];
    for (ll g : MP[x]) {
      // 枚举x的因数, x^y=g -> y=x^g, g=gcd(x,x^g)
      if (mp.count(x ^ g) && g == gcd(x, x ^ g)) {
        ans += mp[x ^ g];
      }
    }
  }
  cout << ans / 2 << '\n';
}

void init() {
  for (ll i = 1; i < maxn; i++) {
    for (ll j = i; j < maxn; j += i) {
      MP[j].push_back(i);
    }
  }
}
```
