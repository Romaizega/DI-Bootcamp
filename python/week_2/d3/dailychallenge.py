import math

class Circle:
    def __init__(self, radius = 0, diameter = 0):
        if radius:
            self.radius = radius
        elif diameter:
            self.radius = diameter / 2
        else:
            self.radius = 0
        
    @property
    def diameter(self):
        return self.radius * 2
    
    @property
    def area(self):
        return math.pi * self.radius ** 2

    def __str__(self):
        return f"Circle: radius = {self.radius}, diameter = {self.diameter}"
    
    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        raise TypeError("Can only add another Circle.")

    def __eq__(self, other):
        return self.radius == other.radius

    def __gt__(self, other):
        return self.radius > other.radius
    
    def __lt__(self, other):
        return self.radius < other.radius

    


