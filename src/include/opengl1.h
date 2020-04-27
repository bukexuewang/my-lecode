#pragma once
#include <glad/glad.h>
#include <GLFW/glfw3.h>

// ��̬������ɫ��
// @param type ��ɫ������, ͨ����GL_VERTEX_SHADER��GL_FRAGMENT_SHADER
// @param source
// @return ��������ɫ��ID, 0��ʾ����ʧ��
unsigned int createShader(GLenum type, const char* source);

// ������ɫ������
// @return ��������ɫ������ID, 0��ʾʧ��
GLuint createProgram(GLuint vertextShader, GLuint fragmentShader);

