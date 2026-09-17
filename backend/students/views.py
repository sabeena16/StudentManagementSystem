from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student


# GET ALL STUDENTS
@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()

    data = []

    for student in students:
        data.append({
            'id': student.id,
            'name': student.name,
            'email': student.email,
            'age': student.age,
            'course': student.course
        })

    return Response(data)


# CREATE STUDENT
@api_view(['POST'])
def create_student(request):

    name = request.data.get('name')
    email = request.data.get('email')
    age = request.data.get('age')
    course = request.data.get('course')

    # Check required fields
    if name is None or email is None or age is None or course is None:
        return Response({
            'error': 'All fields are required.'
        }, status=400)

    # Check age is a number
    try:
        age = int(age)
    except (ValueError, TypeError):
        return Response({
            'error': 'Age must be a number.'
        }, status=400)

    # Check age
    if age <= 0:
        return Response({
            'error': 'Age must be greater than 0.'
        }, status=400)

    # Check email
    if '@' not in email:
        return Response({
            'error': 'Please enter a valid email.'
        }, status=400)

    # Check duplicate email
    if Student.objects.filter(email=email).exists():
        return Response({
            'error': 'A student with this email already exists.'
        }, status=400)

    student = Student.objects.create(
        name=name,
        email=email,
        age=age,
        course=course
    )

    return Response({
        'id': student.id,
        'name': student.name,
        'email': student.email,
        'age': student.age,
        'course': student.course
    }, status=201)


# UPDATE STUDENT
@api_view(['PUT'])
def update_student(request, id):

    student = get_object_or_404(Student, id=id)

    name = request.data.get('name')
    email = request.data.get('email')
    age = request.data.get('age')
    course = request.data.get('course')

    # Check required fields
    if name is None or email is None or age is None or course is None:
        return Response({
            'error': 'All fields are required.'
        }, status=400)

    # Check age is a number
    try:
        age = int(age)
    except (ValueError, TypeError):
        return Response({
            'error': 'Age must be a number.'
        }, status=400)

    # Check age
    if age <= 0:
        return Response({
            'error': 'Age must be greater than 0.'
        }, status=400)

    # Check email
    if '@' not in email:
        return Response({
            'error': 'Please enter a valid email.'
        }, status=400)

    # Check duplicate email
    if Student.objects.filter(email=email).exclude(id=id).exists():
        return Response({
            'error': 'A student with this email already exists.'
        }, status=400)

    student.name = name
    student.email = email
    student.age = age
    student.course = course

    student.save()

    return Response({
        'id': student.id,
        'name': student.name,
        'email': student.email,
        'age': student.age,
        'course': student.course
    })


# DELETE STUDENT
@api_view(['DELETE'])
def delete_student(request, id):

    student = get_object_or_404(Student, id=id)

    student.delete()

    return Response({
        'message': 'Student deleted successfully'
    })