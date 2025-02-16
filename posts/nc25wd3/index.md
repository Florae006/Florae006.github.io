# nc25wd3


## A 智乃的博弈游戏

### 题意

有一堆$n$个石子，每次可以拿走$x$个石子，要求$x$是一个不大于$n$且与$n$互质的数，当面对$1$时选手获胜，询问智乃（先手玩家）能否获胜。

#### 数据范围

- $1\leq n\leq 1e18$

### 思路

必胜点是剩余 1，则 2 是必败点，两个选手都不希望对手面对 1，都希望对手面对 2。

如果当前剩余$n$是奇数，则选手一定可以操作将剩余数量变成偶数（只拿一个）。面对偶数的选手，能选的互质的数一定是一个奇数，偶数减去奇数会变成奇数，下一轮回到奇数的情况，如果某一方保持偶数，一定会到剩余$2$的情况，也就是必败点。

于是本题博弈和初始状态的奇偶性相关。

### 代码

```python
n = int(input())
if n & 1:
    print("Yes")
else:
    print("No")
```

## B

### 题意

#### 数据范围

### 思路

### 代码

## E 智乃的小球

### 题意

在水平线上有$n$个小球，每个小球有一个初始速度，记向右为正，小球的初始速度要么为$1m/s$，要么为$-1m/s$，其质量都相同，坐标为$p_i$。询问在足够长的时间内，能否发生$k$次碰撞，以及第$k$次碰撞发生的时间。

#### 数据范围

- $1\leq n\leq 1e5$
- $1\leq k\leq 1e9$
- $0\leq p_i\leq 1e9,v_i\in \{-1,1\}$

保证一开始所有的小球位置不同。

### 思路

根据高中物理常识，易得，当两个质量相同的小球相向碰撞，会交换彼此的速度。由于本题中所有小球的速度都是$1m/s$或$-1m/s$，可以把交换速度看作两个小球互相穿过对方，依然按照原来的速度向前运动。

也就是说，本题询问若干向右的小球和向左的小球能相遇多少次，这个值可以枚举某个方向的小球的初始位置，再在另一个方向的小球中二分查找当前的小球会遇到多少相向的小球，再对时间进行二分。

第$k$次碰撞的时刻的值大概率是浮点数，在二分时间的时候注意精度不要太小，容易超时。

### 代码

```cpp
void solve() {
  ll n, k;
  cin >> n >> k;
  vector<ld> v1, v2;
  for (ll i = 1; i <= n; i++) {
    ll p, v;
    cin >> p >> v;
    if (v == 1)
      v1.push_back(p);
    else
      v2.push_back(p);
  }
  sort(v1.begin(), v1.end()), sort(v2.begin(), v2.end());
  // k可行性
  ll mk = 0;
  for (ll pi : v1) {
    mk += v2.end() - upper_bound(v2.begin(), v2.end(), pi);
  }
  if (k > mk) {
    cout << "No\n";
    return;
  }

  auto check = [&](ld t) {
    // 这段时间内的碰撞次数
    ll tot = 0;
    t /= 1e7;
    for (ll pi : v1) {
      ll t1 = v2.end() - lower_bound(v2.begin(), v2.end(), pi);
      ll t2 = v2.end() - lower_bound(v2.begin(), v2.end(), pi + 2 * t);
      ll ti = t1 - t2;
      tot += ti;
    }
    return tot;
  };
  ll l = 0, r = 1e16;
  while (l + 1 < r) { // [l,r]
    ll mid = (l + r) / 2;
    if (check(mid) >= k) {
      r = mid;
    } else {
      l = mid;
    }
  }
  cout << "Yes\n";
  cout << fixed << setprecision(9) << 1.0 * l / 1e7 << '\n';
}
```

## F 智乃的捉迷藏

### 题意

在三角形的三个角和三条边着 6 个位置分别设计放多少人，人数总和是$n$，让 A、B、C 三个人分别能看到 a、b、c 数量的人。

#### 数据范围

- $1\leq n\leq 20$
- $1\leq a,b,c\leq n$

### 思路

赛时是直接冲了 6 重循环，暴力 for 遍历枚举 6 个位置的数量可以通过此题（注意边界）。

也可以仅枚举 3 个顶点的位置，计算三遍的位置，判断成立条件。

### 代码：枚举 6 位

```cpp
void solve() {
  ll n, a, b, c;
  cin >> n >> a >> b >> c;
  bool flag = false;
  for (ll i = 0; i <= n; i++) {
    for (ll j = 0; j + i <= n; j++) {
      for (ll k = 0; k + j + i <= n; k++) {
        for (ll x = 0; x + k + j + i <= n; x++) {
          for (ll y = 0; y + x + k + j + i <= n; y++) {
            ll z = n - (y + x + k + j + i);
            if (x + y + z == a && z + i + j == b && x + k + j == c) {
              flag = true;
              break;
            }
          }
          if (flag)
            break;
        }
        if (flag)
          break;
      }
      if (flag)
        break;
    }
    if (flag)
      break;
  }
  if (flag) {
    cout << "Yes\n";

  } else {
    cout << "No\n";
  }
}
```

### 代码：枚举 3 位

```cpp
void solve() {
  ll n, a, b, c;
  cin >> n >> a >> b >> c;
  for (ll i = 0; i <= n; i++) {
    for (ll j = 0; i + j <= n; j++) {
      for (ll k = 0; i + j + k <= n; k++) {
        // 枚举1 3 5号位置
        ll x = a - i - j, y = b - j - k, z = c - i - k;
        if (x >= 0 && y >= 0 && z >= 0 && (i + j + k + x + y + z == n)) {
          cout << "Yes\n";
          return;
        }
      }
    }
  }
  cout << "No\n";
}
```

## L 智乃的三角遍历

### 题意

由三角形构成的平面图，给出层数，找出一条遍历所有边的欧拉回路。

![a45e453edfce3f551cc120d3e219c7c5.png](https://img.dodolalorc.cn/i/2025/02/16/67b13c49a710b.png)

#### 数据范围

### 思路

要找出一种可以在任意层数上复刻的遍历思路，下图是一种思路，每次先向下遍历连到下层的点，再回复到右端点。

![abf8cedc5efe92d97000f75ce4c5429b.png](https://img.dodolalorc.cn/i/2025/02/16/67b13c2ae3c4b.png)

### 代码

```cpp
void solve() {
  ll n;
  cin >> n;
  vector<ll> v;
  ll p = 1;
  v.push_back(p);
  for (ll i = 1; i <= n; i++) {
    p += i;
    v.push_back(p);
  }
  while (p + 1 < 1 + (n + 1 + 1) * (n + 1) / 2) {
    p++;
    v.push_back(p);
  }
  for (ll x = n + 1; x >= 2; x--) {
    p -= x;
    ll pi = p;
    v.push_back(p);
    while (p > 1 + (x - 2) * (x - 1) / 2) {
      v.push_back(p + x - 1);
      p--;
      v.push_back(p);
    }
    while (p + 1 <= pi) {
      p++;
      v.push_back(p);
    }
  }
  cout<<"Yes\n";
  for (auto i : v) {
    cout << i << ' ';
  }
  cout << "\n";
}
```

## M 智乃的牛题

### 题意

判断输入的长度为 8 的字符串能不能重组字符顺序组成`nowcoder`。

#### 数据范围

无

### 思路

无

### 代码

```cpp
void solve() {
  string s;
  cin >> s;
  map<char, ll> mp;
  for (auto c : s) {
    mp[c]++;
  }
  if (mp['n'] == 1 && mp['o'] == 2 && mp['w'] == 1 && mp['c'] == 1 &&
      mp['d'] == 1 && mp['e'] == 1 && mp['r'] == 1) {
    cout << "happy new year\n";
  } else {
    cout << "I AK IOI\n";
  }
}
```

