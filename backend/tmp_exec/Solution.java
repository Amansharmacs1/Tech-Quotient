import java.util.*;
public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int a = sc.nextInt();
        int b = sc.nextInt();
        int t=a;
        a=b;
        b=t;
        // Write your solution here to swap a and b
        
        
        System.out.println(a + " " + b);
    }
}