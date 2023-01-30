// 该方法使用dummyHead
// dummyHead为虚拟头节点，为了让头节点和其他节点共用相同的方法
// dummyHead初始化的时候数据因为null

// 用户不需要在意类里面的具体实现，链表中没有索引的概念，传入index只是表示数据在第几位，从0开始。
// 在我们的链表类中，dummyHead占据index为0形成的链表，实际头节点index为1。所以当我们添加头节点的时候，实际通过dummyHead.next添加新节点，节点位置为1。
// 以此类推，在某个节点添加新元素，即在该index的节点.next指向新节点。
// 最终返回链表的时候并不会带上dummyHead，所以用户得到的头节点index为1。所以节点的位置会减1。而在链表类中所有节点的位置会加1。注意这个映射关系，我们在链中查找或者添加，都是传入的index后面加1，而这个1来自dummyHead。

// 节点
class Node {
    constructor(e = null, next = null) {
        this.e = e;
        this.next = next;
    }
}

// // 链表
class LinkedList {
    constructor() {
        this.dummyHead = new Node();
        this.size = 0;
    }

    // 添加节点
    add(index, e) {

        // 注意index可以取this.size，原因最上面，因为dummyHead的原因，实际添加尾结点在this.size对应节点的next后面。
        if (index < 0 || index > this.size) {
            throw new Error("Add failed. Illegal index");
        };

        // dummyHead指向index为0
        let prev = this.dummyHead;

        // 添加节点的本质是，上一个节点的next指向新节点，然后更新新节点的next
        // index表示的是第几个，而变成中第一个的位置为0，所以需要减1，然后犹豫dummyHead的存在加1，i<index
        // index是我们要添加节点的位置，因为链表没办法直接通过索引获取值，所以通过for循环，不断替换prev，最终找到index对应的值
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        };

        prev.next = new Node(e, prev.next);
        this.size++;

    }

    // 添加头节点-> dummyHead节点的下一个节点即为链表的头节点
    addFirst(e) {
        this.add(0, e);
    };

    // 添加尾结点-> 本质上就是当前的尾结点的next指向新的节点，就完成添加尾结点
    addLast(e) {
        this.add(this.size, e);
    };

    // 获取某个位置的数据
    get(index) {
        if (index < 0 || index > this.size) {
            throw new Error("Get failed. Illegal index");
        };

        let cur = this.dummyHead.next;
        // 通过循环不断替换cur，最终找到对应位置的值。
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        };

        return cur.e;
    };

    getFirst() {
        return this.get(0)
    };

    getLast() {
        // 我们返回的node[index].next.e,需要减1
        return this.get(this.size - 1);
    };

    set(index, e) {
        if (index < 0 || index > this.size) {
            throw new Error("Set failed. Illegal index")
        }

        let cur = this.dummyHead.next;

        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }

        cur.e = e;
    }

    // 判断数据是否存在
    contains(e) {
        let cur = this.dummyHead.next;
        while (cur !== null) {
            if (cur.e === e) {
                return true
            }
            cur = cur.next
        }
        return false;
    }

    remove(index) {
        if (index < 0 || index > this.size) {
            throw new Error('Remove failed. Illegal index')
        }

        let prev = this.dummyHead;
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        }

        let delNode = prev.next;
        prev.next = delNode.next;
        delNode.next = null;
        this.size--;
    }

    removeFirst() {
        this.remove(0)
    }

    removeLast() {
        this.remove(this.size - 1)
    }

    removeElement(el) {
        let prev = this.dummyHead;

        while(prev.next !== null) {
            if(prev.next.e === el) {
                prev.next = prev.next.next;
            } else {
                prev = prev.next;
            }
        }

        this.size--;
        
    }
    
    toString() {
        let ret = '',
        cur = this.dummyHead.next;
        while(cur) {
            ret += `${cur.e}->`;
            cur = cur.next;
        }

        // 最后next指向为null，可加可不加
        ret += 'null';

        console.log(ret);
        return ret;
    }

}

let myLink = new LinkedList();
myLink.addFirst('a')
myLink.addFirst('b')
myLink.addFirst('c')
myLink.addFirst('d')
myLink.addFirst('e')
// myLink.toString()
myLink.addLast('f')
myLink.toString()
console.log(myLink.get(0));
// console.log(myLink.get(3));
// console.log(myLink.getFirst());
// console.log(myLink.getLast());


