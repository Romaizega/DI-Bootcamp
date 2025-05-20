import math

class Pagination():
    def __init__(self, items=None, page_size = 10):
        self.page_size = page_size
        if items is None:
            items = []
        self.items = items
        self.current_idx = 0
        self.total_number = math.ceil(len(self.items) / self.page_size)

    def get_visible_items(self):
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]
    
    def go_to_page(self, page_num):
        if page_num < 1 or page_num > self.total_number:
            raise ValueError("Out of range")
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self
    
    def last_page(self):
        self.current_idx = self.total_number - 1
        return self

    def next_page(self):
        self.current_idx += 1
        return self
    
    def previous_page(self):
        self.current_idx -= 1
        return self
    
    def __str__(self):
        return "\n".join(str(item) for item in self.get_visible_items())

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)
print(p.get_visible_items())
p.next_page()
print(p.get_visible_items())
p.last_page()
print(p.get_visible_items())
p.go_to_page(10)
print(p.current_idx + 1)
p.go_to_page(0)